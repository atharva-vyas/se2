import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Activity = ({ data, setData }) => {

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);


	let [average, setAverage] = useState(null);
	let [streak, setStreak] = useState(null);
	let [cupsToday, setCupsToday] = useState(null);
	let [graphVal, setGraphVal] = useState(null);
	let [graphVal0, setGraphVal0] = useState(null);


	useEffect(() => {
		function areSameDay(epoch1, epoch2) {
			const date1 = new Date(epoch1 * 1000);
			const date2 = new Date(epoch2 * 1000);

			return (
				date1.getFullYear() === date2.getFullYear() &&
				date1.getMonth() === date2.getMonth() &&
				date1.getDate() === date2.getDate()
			);
		}

		function areSameWeek(epoch1, epoch2) {
			const date1 = new Date(epoch1 * 1000);
			const date2 = new Date(epoch2 * 1000);

			// Get the start of the week (Monday)
			const startOfWeek1 = new Date(date1);
			startOfWeek1.setDate(date1.getDate() - date1.getDay() + 1); // Adjusting to Monday

			const startOfWeek2 = new Date(date2);
			startOfWeek2.setDate(date2.getDate() - date2.getDay() + 1); // Adjusting to Monday

			return (
				startOfWeek1.getFullYear() === startOfWeek2.getFullYear() &&
				startOfWeek1.getMonth() === startOfWeek2.getMonth() &&
				startOfWeek1.getDate() === startOfWeek2.getDate()
			);
		}

		function areConsecutiveDays(epoch1, epoch2) {
			// Convert epochs to milliseconds
			const date1 = new Date(epoch1 * 1000);
			const date2 = new Date(epoch2 * 1000);

			// Set time to midnight for both dates
			date1.setHours(0, 0, 0, 0);
			date2.setHours(0, 0, 0, 0);

			// Calculate the difference in days
			const diffInDays = Math.abs((date2 - date1) / (24 * 60 * 60 * 1000));

			// Check if the difference is exactly 1 day
			return diffInDays === 1;
		}

		if (data) {
			function getAverge() {
				let dayCounter = 0
				let sum = 0

				let currentEpoch = 0
				let dailySum = 0

				data[3].map((result) => {
					if (currentEpoch === 0) {
						currentEpoch = result.epoch
					}

					if (areSameDay(result.epoch, currentEpoch)) {
						dailySum += result.value
					} else {
						sum += dailySum
						dayCounter += 1
						dailySum = result.value
						currentEpoch = result.epoch
					}
				})
				// console.log(parseFloat((sum / dayCounter).toFixed(2)))
				setAverage(parseFloat((sum / dayCounter).toFixed(2)))
			}


			function getStreak() {
				let currentEpoch = 0
				let streak = 0
				data[3].map((result) => {
					if (currentEpoch === 0) {
						currentEpoch = result.epoch
					}

					if (areConsecutiveDays(currentEpoch, result.epoch)) {
						// areConsecutiveDays(result.epoch)
						currentEpoch = result.epoch
						streak += 1
					} else {
						// streak = 0
					}
				})
				setStreak(streak)
			}

			function getCupsConsumed() {
				let today = Math.floor(Date.now() / 1000)
				let cupsToday = 0
				data[3].map((result) => {
					if (areSameDay(today, result.epoch)) {
						cupsToday += result.value
						setCupsToday(cupsToday)
					}
				})
			}


			function graphCompute(inpt) {
				function dailyRollingAvg() {
					// DAILY
					let tempaa = []
					function getAverge() {
						let dayCounter = 0
						let sum = 0
						let currentEpoch = 0
						let dailySum = 0
						data[3].map((result) => {
							if (currentEpoch === 0) {
								currentEpoch = result.epoch
							}

							if (areSameDay(result.epoch, currentEpoch)) {
								dailySum += result.value
							} else {
								sum += dailySum
								dayCounter += 1
								dailySum = result.value
								currentEpoch = result.epoch

								tempaa.push([currentEpoch, dailySum])
							}
						})
						return tempaa
					}

					const calculateRollingAverages = (data, lookbackDays) => {
						// Convert and sort data
						const processedData = data.map(([timestamp, value]) => ({
							date: new Date(timestamp * 1000),
							value: value
						})).sort((a, b) => a.date - b.date);
						const results = [];
						const lastIndex = processedData.length - 1;
						let doneDates = []
						// Calculate averages for each day, starting from the most recent
						for (let i = 0; i < Math.min(lookbackDays, processedData.length); i++) {
							const startIndex = lastIndex - i;
							// Get the relevant slice of data
							const relevantData = processedData.slice(
								Math.max(0, startIndex),
								lastIndex + 1
							);
							// Calculate average
							const sum = relevantData.reduce((acc, curr) => acc + curr.value, 0);
							const average = sum / relevantData.length;
							// Safely format date
							const date = processedData[startIndex].date;
							const dateStr = date.getFullYear() + '-' +
								String(date.getMonth() + 1).padStart(2, '0') + '-' +
								String(date.getDate()).padStart(2, '0');
							if (!doneDates.includes(dateStr)) {
								results.push({
									daysAgo: i,
									date: dateStr,
									average: average.toFixed(2),
									dataPoints: relevantData.length
								});
								doneDates.push(dateStr)
							}
						}
						return results;
					};

					// console.log(calculateRollingAverages(getAverge(), inpt))
					return calculateRollingAverages(getAverge(), inpt)
				}



				function weeklyRollingAvg() {
					function areSameWeek(epoch1, epoch2) {
						const date1 = new Date(epoch1 * 1000);
						const date2 = new Date(epoch2 * 1000);

						// Get the start of the week (Monday)
						const startOfWeek1 = new Date(date1);
						startOfWeek1.setDate(date1.getDate() - date1.getDay() + 1); // Adjusting to Monday

						const startOfWeek2 = new Date(date2);
						startOfWeek2.setDate(date2.getDate() - date2.getDay() + 1); // Adjusting to Monday

						return (
							startOfWeek1.getFullYear() === startOfWeek2.getFullYear() &&
							startOfWeek1.getMonth() === startOfWeek2.getMonth() &&
							startOfWeek1.getDate() === startOfWeek2.getDate()
						);
					}

					// DAILY
					let tempaa = []
					function getAverge() {
						let dayCounter = 0
						let sum = 0
						let currentEpoch = 0
						let dailySum = 0
						data[3].map((result) => {
							if (currentEpoch === 0) {
								currentEpoch = result.epoch
							}

							if (areSameWeek(result.epoch, currentEpoch)) {
								dailySum += result.value
							} else {
								sum += dailySum
								dayCounter += 1
								dailySum = result.value
								currentEpoch = result.epoch

								tempaa.push([currentEpoch, dailySum])
							}
						})
						return tempaa
					}

					const calculateRollingAverages = (data, lookbackDays) => {
						// Convert and sort data
						const processedData = data.map(([timestamp, value]) => ({
							date: new Date(timestamp * 1000),
							value: value
						})).sort((a, b) => a.date - b.date);
						const results = [];
						const lastIndex = processedData.length - 1;
						let doneDates = []
						// Calculate averages for each day, starting from the most recent
						for (let i = 0; i < Math.min(lookbackDays, processedData.length); i++) {
							const startIndex = lastIndex - i;
							// Get the relevant slice of data
							const relevantData = processedData.slice(
								Math.max(0, startIndex),
								lastIndex + 1
							);
							// Calculate average
							const sum = relevantData.reduce((acc, curr) => acc + curr.value, 0);
							const average = sum / relevantData.length;
							// Safely format date
							const date = processedData[startIndex].date;
							const dateStr = date.getFullYear() + '-' +
								String(date.getMonth() + 1).padStart(2, '0') + '-' +
								String(date.getDate()).padStart(2, '0');
							if (!doneDates.includes(dateStr)) {
								results.push({
									daysAgo: i,
									date: dateStr,
									average: average.toFixed(2),
									dataPoints: relevantData.length
								});
								doneDates.push(dateStr)
							}
						}
						return results;
					};

					// console.log(calculateRollingAverages(getAverge(), inpt))
					return calculateRollingAverages(getAverge(), inpt)
				}



				function monthlyRollingAvg() {
					function areSameMonth(epoch1, epoch2) {
						const date1 = new Date(epoch1 * 1000);
						const date2 = new Date(epoch2 * 1000);

						return (
							date1.getFullYear() === date2.getFullYear() &&
							date1.getMonth() === date2.getMonth()
						);
					}

					// DAILY
					let tempaa = []
					function getAverge() {
						let dayCounter = 0
						let sum = 0
						let currentEpoch = 0
						let dailySum = 0
						data[3].map((result) => {
							if (currentEpoch === 0) {
								currentEpoch = result.epoch
							}

							if (areSameMonth(result.epoch, currentEpoch)) {
								dailySum += result.value
							} else {
								sum += dailySum
								dayCounter += 1
								dailySum = result.value
								currentEpoch = result.epoch

								tempaa.push([currentEpoch, dailySum])
							}
						})
						return tempaa
					}

					const calculateRollingAverages = (data, lookbackDays) => {
						// Convert and sort data
						const processedData = data.map(([timestamp, value]) => ({
							date: new Date(timestamp * 1000),
							value: value
						})).sort((a, b) => a.date - b.date);
						const results = [];
						const lastIndex = processedData.length - 1;
						let doneDates = []
						// Calculate averages for each day, starting from the most recent
						for (let i = 0; i < Math.min(lookbackDays, processedData.length); i++) {
							const startIndex = lastIndex - i;
							// Get the relevant slice of data
							const relevantData = processedData.slice(
								Math.max(0, startIndex),
								lastIndex + 1
							);
							// Calculate average
							const sum = relevantData.reduce((acc, curr) => acc + curr.value, 0);
							const average = sum / relevantData.length;
							// Safely format date
							const date = processedData[startIndex].date;
							const dateStr = date.getFullYear() + '-' +
								String(date.getMonth() + 1).padStart(2, '0') + '-' +
								String(date.getDate()).padStart(2, '0');
							if (!doneDates.includes(dateStr)) {
								results.push({
									daysAgo: i,
									date: dateStr,
									average: average.toFixed(2),
									dataPoints: relevantData.length
								});
								doneDates.push(dateStr)
							}
						}
						return results;
					};

					// console.log(calculateRollingAverages(getAverge(), inpt))
					return calculateRollingAverages(getAverge(), inpt)

				}

				dailyRollingAvg()
				weeklyRollingAvg()
				monthlyRollingAvg()
				// setGraphVal({ dailyRollingAvg: dailyRollingAvg(), weeklyRollingAvg: weeklyRollingAvg(), monthlyRollingAvg: monthlyRollingAvg() })


				let temp000 = { dailyRollingAvg: dailyRollingAvg(), weeklyRollingAvg: weeklyRollingAvg(), monthlyRollingAvg: monthlyRollingAvg() }
				setGraphVal0(temp000)

				let tempArr000 = [
					{
						"id": "Consumption",
						"color": "#4cceac",
						"data": []
					}, {
						"id": "Weekly Avg",
						"color": "#a4a9fc",
						"data": []
					}, {
						"id": "Monthly Avg",
						"color": "#f1b9b7",
						"data": []
					}
				]

				// dailyRollingAvg
				for (let i = 0; i < temp000.dailyRollingAvg.length; i++) {
					tempArr000[0].data.push({ x: temp000.dailyRollingAvg[i].daysAgo, y: temp000.dailyRollingAvg[i].average })
				}

				for (let i = 0; i < temp000.weeklyRollingAvg.length; i++) {
					tempArr000[1].data.push({ x: temp000.weeklyRollingAvg[i].daysAgo, y: temp000.weeklyRollingAvg[i].average })
				}

				for (let i = 0; i < temp000.monthlyRollingAvg.length; i++) {
					tempArr000[2].data.push({ x: temp000.monthlyRollingAvg[i].daysAgo, y: temp000.monthlyRollingAvg[i].average })
				}

				setGraphVal(tempArr000)
			}
			graphCompute(12)

			getCupsConsumed()
			getStreak()
			getAverge()
		}
	}, [data]);


	useEffect(() => {
		console.log(graphVal)
	}, [graphVal])


	function getLast14Days() {
		const dates = [];
		const today = new Date();

		for (let i = 0; i < 14; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() - i);

			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			dates.push(`${month}/${day}`);
		}

		return dates;
	}

	function epochToTime24hr(epochTimestamp) {
		// Create a new Date object using the epoch timestamp
		const date = new Date(epochTimestamp * 1000); // Multiply by 1000 as JS uses milliseconds

		// Get hours, minutes, and seconds
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		// Pad single digits with leading zeros
		hours = hours.toString().padStart(2, '0');
		minutes = minutes.toString().padStart(2, '0');
		seconds = seconds.toString().padStart(2, '0');

		// Return the formatted time string
		return `${hours}:${minutes}:${seconds}`;
	}

	function epochToDate(epoch) {
		// Create a new Date object using the epoch timestamp
		const date = new Date(epoch);

		// Get month, day, and year
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear().toString().slice(-2);

		// Return the formatted date string
		return `${month}/${day}/${year}`;
	}

	function createNewLogEntry() {
		let userInput = prompt(data[0].logPrompt)
		userInput = parseInt(userInput, 10)
		if (Number.isInteger(userInput)) {
			let currentEpoch = Math.floor(Date.now() / 1000);

			let tempArr = [...data]
			tempArr[3].unshift({ value: userInput, epoch: currentEpoch })

			setData(tempArr)
			console.log(data)
		}
	}

	let days = getLast14Days()


	return (
		(data) ? (
			<>

				<Box m="20px">
					{/* HEADER */}
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Header title={data[0].title} subtitle="Welcome to your dashboard" />

						<Box>
							<Button
								sx={{
									backgroundColor: colors.blueAccent[700],
									color: colors.grey[100],
									fontSize: "14px",
									fontWeight: "bold",
									padding: "10px 20px",
								}}
							>
								Set Goal: 10
							</Button>
						</Box>
					</Box>

					{/* GRID & CHARTS */}
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gridAutoRows="140px"
						gap="20px"
					>
						{/* ROW 1 */}
						<Box
							gridColumn="span 4"
							backgroundColor={colors.primary[400]}
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<StatBox
								title={cupsToday}
								subtitle={data[1][0].title}
								progress={data[1][0].graphVal}
								increase="+14%"
								icon={
									<LocalDrinkIcon
										sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
									/>
								}
							/>
						</Box>
						<Box
							gridColumn="span 4"
							backgroundColor={colors.primary[400]}
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<StatBox
								title={streak}
								subtitle={data[1][1].title}
								progress={data[1][1].graphVal}
								increase="+5%"
								icon={
									<WhatshotIcon
										sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
									/>
								}
							/>
						</Box>
						<Box
							gridColumn="span 4"
							backgroundColor={colors.primary[400]}
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<StatBox
								title={average}
								subtitle={data[1][2].title}
								progress={data[1][2].graphVal}
								increase="+43%"
								icon={
									<DirectionsRunIcon
										sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
									/>
								}
							/>
						</Box>

						{/* ROW 2 */}
						<Box
							gridColumn="span 8"
							gridRow="span 2"
							backgroundColor={colors.primary[400]}
						>
							<Box
								mt="25px"
								p="0 30px"
								display="flex "
								justifyContent="space-between"
								alignItems="center"
							>
								<Box>
									<Typography
										variant="h5"
										fontWeight="600"
										color={colors.grey[100]}
									>
										{data[2][0].title}

									</Typography>
									<Typography
										variant="h3"
										fontWeight="bold"
										color={colors.greenAccent[500]}
									>
										{data[2][0].graphVal}
									</Typography>
								</Box>
								<Box>
									<IconButton>
										<DownloadOutlinedIcon
											sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
										/>
									</IconButton>
								</Box>
							</Box>
							<Box height="250px" m="-20px 0 0 0">
								{(graphVal)?(<>
									<LineChart data={graphVal} isDashboard={true} />
								</>):(<>
								</>)}
							</Box>
						</Box>
						<Box
							gridColumn="span 4"
							gridRow="span 2"
							backgroundColor={colors.primary[400]}
							p="30px"
						>
							<Typography variant="h5" fontWeight="600">
								{data[2][1].title}
							</Typography>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								mt="25px"
							>
								{/* <ProgressCircle size="125" /> */}
								<Box position="relative" display="inline-flex">
									<ProgressCircle size="125" />
									{/* Text inside Progress Circle */}
									<Box
										position="absolute"
										top="50%"
										left="50%"
										display="flex"
										alignItems="center"
										justifyContent="center"
										transform="translate(-50%, -50%)"
									>
										<Typography
											variant="h3" // Adjust variant as needed
											color={colors.greenAccent[500]}
											align="center"
										>
											{data[2][1].value}
										</Typography>
									</Box>
								</Box>
								<Typography
									variant="h5"
									color={colors.greenAccent[500]}
									sx={{ mt: "15px" }}
								>
									{data[2][1].subtitle}
								</Typography>
							</Box>
						</Box>

						{/* ROW 3 */}
						<Box
							gridColumn="span 12"
							gridRow="span 2"
							backgroundColor={colors.primary[400]}
							overflow="auto"
						>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								borderBottom={`4px solid ${colors.primary[500]}`}
								colors={colors.grey[100]}
								p="15px"
							>
								<Typography color={colors.grey[100]} variant="h5" fontWeight="600">
									Recent Logs
								</Typography>
								<Button variant="contained" onClick={createNewLogEntry}>New Entry</Button>
							</Box>
							{data[3].slice(0, 30).map((transaction, i) => (
								<Box
									key={`${transaction.txId}-${i}`}
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									borderBottom={`4px solid ${colors.primary[500]}`}
									p="15px"
								>
									<Box>
										<Typography
											color={colors.greenAccent[500]}
											variant="h5"
											fontWeight="600"
										>
											{transaction.value}
										</Typography>
										<Typography color={colors.grey[100]}>
											Time: {epochToTime24hr(transaction.epoch)}
										</Typography>
									</Box>
									<Box color={colors.grey[100]}>Date: {epochToDate(transaction.epoch)}</Box>
									<Box
										backgroundColor={colors.greenAccent[500]}
										p="5px 10px"
										borderRadius="4px"
									>
										<TaskAltIcon />
									</Box>
								</Box>
							))}
						</Box>

					</Box>
				</Box>
			</>
		) : (<></>)
	);
};

export default Activity;
