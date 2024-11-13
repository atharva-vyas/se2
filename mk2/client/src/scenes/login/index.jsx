import React, { useEffect, useState } from 'react';
import './index.css'

const axios = require('axios').default;

function Login({ setUser }) {
	let [userDB, setUserDB] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	let submittedCreds = false

	// handles the user login
	function login() {
		let submittedCreds = true
		if (userDB.includes([username, password])) {
			setUser([username, password])
		} else {
			if (username && password) {
				setUserDB(userDB => [...userDB, [username, password]]);
				setUser([username, password])
			}
		}
	}

	// background video, that plays in the background
	// const video = "videoplayback.webm"
	const video = "downloadfile_1_1.mp4"

	return (
		<div>
			<div class="vid-container">
				<video class="bgvid" autoplay="autoPlay" muted="muted" preload="auto" loop>
					<source src={video} type="video/webm" />
				</video>

				<div class="inner-container">
					<video class="bgvid inner" autoPlay="autoPlay" muted="muted" preload="auto" loop>
						<source src={video} type="video/webm" />
					</video>
					<form onSubmit={(e) => { e.preventDefault() }}>
						<div class="box">
							<h1>Login | Sign Up</h1>
							<input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" />
							<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
							<button onClick={login} type="submit"> Login/Sign Up </button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)

}

export default Login
