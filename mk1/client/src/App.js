import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Activity from "./scenes/activity";
import Login from "./scenes/login";
import Home from "./scenes/home";

function App() {
	let [data, setData] = useState(null);
	let [mainData, setMainData] = useState(0);
	let [user, setUser] = useState(null);

	useEffect(() => {
		fetch('/data.json')  // Adjust the path if necessary
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setMainData(data)
				setData(data[0].data)
			})
			// .then(data => setData(data))
			.catch(error => console.error('Error fetching data:', error));
	}, []);


	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/activity" element={<Activity mainData={mainData} setMainData={setMainData} data={data} setData={setData} user={user} setUser={setUser} />} />
			{/* <Route path="/login" element={<Login />} /> */}
		</Routes>
	);
}

export default App;
