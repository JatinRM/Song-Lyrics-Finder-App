import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home/Home';
import Original from './Pages/Original/Original';

function App() {


	return (
		<Routes>
			< Route path='/' element = {<Home />} />
			< Route path='original' element = {<Original />} />
		</Routes>
  )
}

export default App
