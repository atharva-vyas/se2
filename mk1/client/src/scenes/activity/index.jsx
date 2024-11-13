import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";
import Login from "../../scenes/login";
// import Home from "./scenes/home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import ActivityComponent from './activity_component';

const Activity = ({ setCWActivity, mainData, setMainData, data, setData, user, setUser }) => {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);


	return (
		(user) ? (
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="app">
						<Sidebar setCWActivity={setCWActivity} mainData={mainData} data={data} isSidebar={isSidebar} />
						<main className="content">
							<Topbar setIsSidebar={setIsSidebar} />
							<ActivityComponent mainData={mainData} setMainData={setMainData} data={data} setData={setData} />
						</main>
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
		) : (<Login setUser={setUser} />)
	)
};

export default Activity;
