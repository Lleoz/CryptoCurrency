import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import Header from "./components/Header";
import Home from "./pages/Home";
import CoinsPage from "./pages/CoinsPage";
import {
  ThemeProvider, 
  createTheme,
  Paper } from '@mui/material';


const App =() => {

  const [mode, setMode] = useState('light')
  
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  
  const changeTheme = ( name ) =>{
    setMode(name)
  }

  return (
    <ThemeProvider theme={theme}>

    <BrowserRouter>
    <Paper>
      <Header
        onChangeTheme = { changeTheme }
      ></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<CoinsPage />} />
      </Routes>
    </Paper>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;