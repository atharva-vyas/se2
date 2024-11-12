import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CardItem.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/joy/Avatar';
import LoadingButton from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function CardItem(props) {
  const [input, setInput] = useState("")
  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    navigate("/dashboard");
    navigate('/dashboard', { replace: true })
  };

  let title = props.data[0].title
  let user = props.data[0].user
  let icon = props.data[0].icon
  let message = props.data[0].message

  let increament = props.increament
  let decreament = props.decreament

  const goToTop = () => {        
    window.scrollTo(0, 0);
  };

  const messageRef = useRef();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        block: 'end',
        inline: 'nearest'
      })
      
      if (!loaded) {
        setLoaded(true)
        goToTop()
      }
    }
  }, [increament, decreament])

  return (
    <>  
      <div className="cards__item__info0">
        <div className='cards__item__info' align="center">
          <div className="previous-button-mobile">
            <ArrowBackIosNewIcon onClick={decreament}/>
          </div>

          <h5 className='cards__item__text'>{props.text}</h5>

          <div className="next-button-mobile">
            <ArrowForwardIosIcon onClick={increament}/>
          </div>
        </div>
      </div>
      
      
      <li className='cards__item'>
        {/* <Link className='cards__item__link' to={props.path}> */}
        <Link className='cards__item__link'>

          <div className="chat">
            

            <div className="chatHeader">
              <div className="chatHeader__left">
                <h3>
                  <span className="chatHeader__hash">{title}</span>
                </h3>
              </div>
            </div>
            

            <div className="chat__messages">
              {message.map((message) => (
                <>
                  <div className="message">
                    {(icon)?(
                      <img src={"/" + icon +".png"} alt="image" width="43" height="43"/>
                    ):(
                      <AccountCircleIcon fontSize="large" />
                    )}
                    <div className="message__info">
                      <h4>
                        {user}
                        <span className="message__timestamp">Today</span>
                      </h4>

                      <p>{message[0]}</p>
                    </div>
                  </div>
                  <div className="message_response" ref={messageRef}>
                    <img src="/robot.png" alt="image" width="43" height="43"/>
                    <div className="message__info_response">
                      <p>{message[1]}</p>
                    </div>
                </div>
                <div className="lastMsg"></div>
                </>
              ))}
            </div>


            <div className="chat__input">
              <form onSubmit={handleSubmit}>
                  <input className="chat__mainTextFeild" disabled={false} value={input} onChange={(e) => setInput(e.target.value)} placeholder={'# Message'} />
                  <button className="chat__inputButton" type="submit">
                      Send Message
                  </button>
              </form>
              
              <Link to='/dashboard' className="chat__inputIcons00">
                <div className="chat__inputIcons">
                    <ArrowUpwardIcon fontSize="large" disabled={false}/>
                </div>
              </Link>
            </div>

          </div>
        
        </Link>
      </li>

    </>
  );
}

export default CardItem;
