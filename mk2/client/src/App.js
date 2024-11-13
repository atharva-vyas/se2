import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Activity from "./scenes/activity";
import Login from "./scenes/login";
import Home from "./scenes/home";
import { type } from '@testing-library/user-event/dist/type';

function App() {
	let [data, setData] = useState(null);
	let [mainData, setMainData] = useState(null);
	let [user, setUser] = useState(null);
	let [cwActivty, setCWActivity] = useState(null);

	useEffect(() => {
		fetch('/data.json')  // Adjust the path if necessary
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				if (user) {
					for (let i = 0; i < data.length; i++) {
						if (data[i].usr === user) {
							setMainData(data[0].data)
							setData(data[0].data[0].data)
							i = data.length
						} else {
							alert('invalid username or password')
						}
					}

				}
			})
			// .then(data => setData(data))
			.catch(error => console.error('Error fetching data:', error));
	}, [user]);

	useEffect(() => {
		if (mainData && cwActivty) {
			setData(mainData[cwActivty].data)
		}
	}, [cwActivty, mainData]);


	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/activity" element={<Activity setCWActivity={setCWActivity} mainData={mainData} setMainData={setMainData} data={data} setData={setData} user={user} setUser={setUser} />} />
			{/* <Route path="/login" element={<Login />} /> */}
		</Routes>
	);
}

export default App;
