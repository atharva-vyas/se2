import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import './Main.css';

const axios = require('axios').default;

function Main() {
	// stores all the messages and channel data
	let [channels, setChannels] = useState([])
	// stores the channel that is currently selected by the user
	let [selectedChannel, setSelectedChannel] = useState("")
	// stores the user info like -> username, publicKey, etc.
	let [user, setUser] = useState([])
	// stores the server info like server name, server state, etc.
	let [serverInfo, setServerInfo] = useState([])
	// stores the list of all the info about all the users on a server
	let [userlist, setUserList] = useState([])

	// gets server info like server name
	useEffect(() => {
		// axios.get('/state').then((result) => {
		// 	setServerInfo([result.data]);
		// })
		updateData()
	}, [])

	// gets the server data
	function updateData() {
		new Promise(() => {
			// axios.get("/getData").then((result) => {
			// updates user list
			// setUserList(result.data.users)
			//
			// // pushes data to a temporary array
			// const tempArr = []
			// result.data.message.map((content) => (
			// 	tempArr.push(content)
			// ))

			let temp00 = [
				{channelName: "name",
				data: [{
					user: "user",
					date: "date",
					msg: "msg"
				}]}
			]

			// updates the setChannels state, which is responsible for storing all the server data like messages, channels, etc.
			setChannels(temp00)
			// })
		})
	}

	return (
		// checks if user info is present, if not it renders the Login.js page
		// if a user presents, then it renders the main Sidebar.js, Chat.js & UserSidebar.js
		(user.length === 0) ? (
			<Login setUser={setUser} />
		) : (
			<div className="app">
				<Sidebar
					updateData={updateData}
					channels={channels} setChannels={setChannels}
					selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel}
					setUser={setUser} user={user}
					serverInfo={serverInfo}
				/>

				<Chat
					selectedChannel={selectedChannel} channels={channels} setChannels={setChannels}
					user={user}
				/>
			</div>
		)
	);
}

export default Main;
