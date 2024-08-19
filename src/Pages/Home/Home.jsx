import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="intro">
				<div className='intro1'>Hello, My name is <span className='myName'>Jatin Mahakal</span><br></br>
					<span className='intro2'>Welcome to my website</span>
				</div>
				</div>
				<div className="intro3">Here you can find lyrics for any song</div>
			<button className='next' onClick={()=> navigate('./original')}>Next</button>
		</div>
	)
}

export default Home
