import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcon from '@mui/icons-material/Add';
import Person2Icon from '@mui/icons-material/Person2';
import { Person2 } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

function Sidebar({ setMainData, setCWActivity, mainData, data }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");

	// if (typeof setCWActivity === 'undefined') {
	// 	console.error("setCWActivity is not a function");
	// }
	//
	// function setChannels(result) {
	// 	if (typeof setCWActivity === 'function') {
	// 		setCWActivity(result);
	// 	} else {
	// 		console.error("setCWActivity is not a function");
	// 	}
	// }
	//

	function addNewChannel() {
		let channelName = prompt("Enter your desired channel name:")
		console.log(mainData)

		let ioio = [
			{
				"name": channelName,
				"id": mainData.length - 1,
				"data": [
					{
						"title": channelName,
						"goal": 15,
						"logPrompt": "Enter the number of glasses:"
					},
					[
						{
							"title": "Cups Consumed Today",
							"graphVal": 0.75
						},
						{
							"title": "Current Streak",
							"graphVal": 0.75
						},
						{
							"title": "Average",
							"graphVal": 0.75
						}
					],
					[
						{
							"title": "Past 14 Days Consumption",
							"graphVal": 1234,
							"value": [
								{
									"id": "Consumption",
									"color": "#4cceac"
								},
								{
									"id": "Weekly Avg",
									"color": "#a4a9fc"
								},
								{
									"id": "Monthly Avg",
									"color": "#f1b9b7"
								}
							]
						},
						{
							"value": 4,
							"title": "Daily goal",
							"subtitle": "Complete the Daily goal to keep up your streak",
							"graphVal": 0.5
						}
					],
					[
						{
							"value": 2,
							"epoch": 1699589881
						}
					]
				]
			}
		]

		let yy = mainData
		yy.push(ioio[0])
		console.log(yy)
		// setMainData([...mainData, yy]);
	}


	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[400]} !important`,
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important",
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important",
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>


					{/* {!isCollapsed && ( */}
					{/* 	<Box mb="25px"> */}
					{/* 		<Box display="flex" justifyContent="center" alignItems="center"> */}
					{/* 			<img */}
					{/* 				alt="profile-user" */}
					{/* 				width="100px" */}
					{/* 				height="100px" */}
					{/* 				src={`../../assets/user.png`} */}
					{/* 				// src={<Person2/>} */}
					{/* 				style={{ cursor: "pointer", borderRadius: "50%" }} */}
					{/* 			/> */}
					{/* 		</Box> */}
					{/* 		<Box textAlign="center"> */}
					{/* 			<Typography */}
					{/* 				variant="h2" */}
					{/* 				color={colors.grey[100]} */}
					{/* 				fontWeight="bold" */}
					{/* 				sx={{ m: "10px 0 0 0" }} */}
					{/* 			> */}
					{/* 				Ed Roh */}
					{/* 			</Typography> */}
					{/* 		</Box> */}
					{/* 	</Box> */}
					{/* )} */}
					{/**/}
					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						{(mainData) ? (
							mainData.map((channels) => (
								// <div onClick={() => console.log(mainData.indexOf(channels))}>
								< div onClick={() => setCWActivity(mainData.indexOf(channels))}>
									<Item
										title={channels.name}
										icon={<HomeOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</div>
							))
						) : (<></>)}

						<div onClick={addNewChannel}>
							<Item
								title="Add new Channel"
								icon={<HomeOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						</div>

					</Box>
				</Menu>
			</ProSidebar>
		</Box >
	);
};

export default Sidebar;
