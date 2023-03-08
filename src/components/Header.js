import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = ( {onChangeTheme} ) => {

    const [theme, setTheme] = useState('light');

    const navigate = useNavigate();

    const { fav } = CryptoState();
    console.log(fav)

    let show = false;

    const toogleFavs = () => {
        show = !show;
        console.log(show)
    }
    

    const handleChangeTheme = (e) => {
        e.preventDefault();
        setTheme(e.target.value);
        onChangeTheme(e.target.value)
      };


  return (
    <AppBar color="transparent"
    position='static'>
        <Container>
            <Toolbar sx={{
                display: 'grid',
                gridAutoColumns: '1fr',
                gap: 1,
            }}>
                <Typography sx={{ gridRow: '1', gridColumn: 'span 2' }} variant='h2' onClick={ () => navigate('/') } >Crypto Currency</Typography>
                <FormControl sx={{ gridRow: '1', gridColumn: '3 / 5', width: "50%" }}>
                    <InputLabel id="select-label">Select Theme</InputLabel>
                    <Select labelId="select-label" variant='outlined' label="Select Theme" 
                    onChange={handleChangeTheme} value={theme}>
                        <MenuItem value={"dark"}>Dark</MenuItem>
                        <MenuItem value={"light"}>Light</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ gridRow: '1', gridColumn: '4 / 5' }}>
                    <InputLabel id="select-label-fav">Favorites</InputLabel>


{
                    <Select labelId="select-label-fav" variant='outlined' label="Favorites" 
                     value="Favorites">
                        {
                        fav.map( (row) => {
                            return <MenuItem 
                            value="{row}"
                            key="{row}">{row}</MenuItem>
                        })
                        }

                    </Select> }
                </FormControl>

            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header