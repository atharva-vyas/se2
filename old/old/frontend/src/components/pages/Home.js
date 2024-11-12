import React, { useState, useRef, useEffect } from 'react';
// import '../../App.css';
import Cards from '../Cards';
// import HeroSection from '../HeroSection';
import Footer from '../Footer';
// import Navbar from '../Navbar';
import header from "../header.png"

import { Button } from '../Button';
import { ButtonScroll } from '../ButtonScroll';
import { Link } from 'react-router-dom';
import '../Navbar.css';

import '../HeroSection.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home() {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);
	let [videoLoaded, setVideoLoaded] = useState(false);
	
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	window.addEventListener('resize', showButton);

	const useCaseRef = useRef();
	const scrollToUseCase = () => {
		if (useCaseRef.current) {
			useCaseRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest'
			})
		}
	}

	

	const contactRef = useRef();
	const scrollToContact= () => {
		if (contactRef.current) {
			contactRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest'
			})
		}
	}

	return (
		<>
			<>
				<nav className='navbar'>
					<div className='navbar-container'>
						<Link className='navbar-logo' onClick={closeMobileMenu}>
							<img src={header} className="handPng" />
						</Link>
						
						<div className='menu-icon' onClick={handleClick}>
							<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
						</div>

						<ul className={click ? 'nav-menu active' : 'nav-menu'}>
							
							<li className='nav-item' onClick={scrollToContact}>
								<Link
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Contact
								</Link>
							</li>
							<li className='nav-item' onClick={scrollToUseCase}>
								<Link
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Use Cases
								</Link>
							</li>

							<li>
								<Link
									to='/dashboard'
									className='nav-links-mobile'
									onClick={closeMobileMenu}
								>
									Sign Up
								</Link>
							</li>
						</ul>
						
						{button && <Button buttonStyle='btn--outline--signup'>SIGN UP</Button>}
					</div>
				</nav>
			</>

			
			<>
				<div className='hero-container'>
					<video src={require('./video-3.mp4')} autoPlay loop muted onLoadedData={()=>{setVideoLoaded(true)}}/>
					{(videoLoaded)?(<></>):(<img className="mainImageHeader" src="video-3.jpg" />)}
					
					<h1>Your Personal Fitness Companion</h1>
					<p>Track Workouts, Nutrition & Progress</p>
					<div className='hero-btns'>
						<Link to='/dashboard' className='btn-mobile'>
							<Button
								className='btns'
								buttonStyle='btn--outline'
								buttonSize='btn--large'
							>
								GET STARTED
							</Button>
						</Link>
						<Button
							className='btns'
							buttonStyle='btn--primary'
							buttonSize='btn--large'
						>
							USE CASES
						</Button>
					</div>
				</div>
				
				{/* <div ref={useCaseRef}>
					<Cards />
				</div>
				<div ref={contactRef}>
				<Footer />
				</div> */}
			</>
		</>
	);
}

export default Home;


