import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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

function Sidebar({ setCWActivity, mainData, data }) {
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


					{!isCollapsed && (
						<Box mb="25px">
							<Box display="flex" justifyContent="center" alignItems="center">
								<img
									alt="profile-user"
									width="100px"
									height="100px"
									src={`../../assets/user.png`}
									style={{ cursor: "pointer", borderRadius: "50%" }}
								/>
							</Box>
							<Box textAlign="center">
								<Typography
									variant="h2"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ m: "10px 0 0 0" }}
								>
									Ed Roh
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						{(mainData) ? (
							mainData.map((channels) => (
								<div onClick={() => setCWActivity(mainData.indexOf(channels))}>
									<Item
										title={channels.name}
										icon={<HomeOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</div>
							))
						) : (<></>)}
					</Box>
				</Menu>
			</ProSidebar>
		</Box >
	);
};

export default Sidebar;
