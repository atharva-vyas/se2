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
			tempArr[3].unshift({value: userInput, epoch: currentEpoch})

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
								title={data[1][0].value}
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
								title={data[1][1].value}
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
								title={data[1][2].value}
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
								<LineChart data={data[2][0].value} isDashboard={true} />
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
							{data[3].map((transaction, i) => (
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
