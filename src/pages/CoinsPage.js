import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from "../config/api"
import ReactHtmlParser from "react-html-parser";
import { Box } from '@mui/system';
import { CryptoState } from '../CryptoContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CoinsPage = () => {
    
    const numberWithCommas = (x) => {
        return ( !!x ) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0.0;
    }
    
    const { id } = useParams()
    const [coin, setCoin] = useState();

    const { fav, setFav } = CryptoState();
    
    const fetchCoins = async() => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data);
    }

    const addNewFav = (name) => {
        console.log("Tratando de agragar fav")
        if(fav.includes(name)){
            setFav(fav.filter( item => item !== name));
        } else {
            setFav([name, ...fav]) ;
        }
    }

    const existFav = ( name ) => {
        return fav.includes(name);
    }
    
    useEffect(() => {
        fetchCoins();
    }, [])
    
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <Box sx={{
            display: 'grid',
            gridAutoColumns: '1fr',
            gap: 1}}
        >
        <Box sx = {{
            gridRow: '1', 
            gridColumn: '1/3', 
            display:"grid",
            alignItems: "center",
            marginTop: 5,
            borderRight: "2px solid grey",
            padding:5
        }}>
        <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx = {{
            fontWeight: "bold"
        }}>
        {coin?.name}

        {
            (existFav(coin.name)) ? (
                <FavoriteIcon sx = {{
                    color: "red",
                    fontSize: 32,
                }} onClick={ () => addNewFav(coin.name)}></FavoriteIcon>
            ) : (
                <FavoriteBorderIcon sx = {{
                    color: "red",
                    fontSize: 32,
                }} onClick={ () => addNewFav(coin.name)}></FavoriteBorderIcon>
            )

        }

        </Typography>
        <Typography variant="subtitle1" sx={{
            width: 1,
            paddingTop: 0,
            textAlign: "justify",
        }}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        
        <div sx = {{
            alignSelf: "start",
            padding: 1,
            width: 1,
        }}>
        <span style={{ display: "flex" }}>
            <Typography variant="h5" sx = {{
                fontWeight: "bold",
            }}>
            Rank:
            </Typography>
            <Typography
            variant="h5"
            >
                {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
        </span>
        <span style={{ display: "flex" }}>
            <Typography variant="h5" sx = {{
                fontWeight: "bold",
            }}>
            Current Price:
            </Typography>
            <Typography
            variant="h5"
            >
            $ {" "}
            {numberWithCommas(
                coin?.market_data.current_price['usd']
                )}
            </Typography>
            </span>
            <span style={{ display: "flex" }}>
            <Typography variant="h5" sx = {{
            fontWeight: "bold"
        }}>
            Market Cap:
            </Typography>
            <Typography
            variant="h5"
            >
            $ {" "}
            {numberWithCommas(
                coin?.market_data.market_cap['usd']
                .toString()
                .slice(0, -6)
                )}
                M
            </Typography>
        </span>
        </div>
                    
                    
        </Box>
        <Box sx = {{
                gridRow: '1', 
                gridColumn: 'span 2' ,
                display:"grid",
                alignItems: "center",
                marginTop: 5,
                borderRight: "2px solid grey"
            }}>
            <CoinInfo coin={coin} ></CoinInfo>
        </Box>
        </Box>
        )}
            
    export default CoinsPage