import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from "react"
import { CoinList } from '../config/api'
import { Container, TextField, TableContainer, LinearProgress, TableHead, TableRow, TableCell, Table, TableBody,
FormControl, InputLabel, Select, MenuItem, Box, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const CoinsTable = () => {

    
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [orden, setOrden] = useState('gecko_desc')
    const [currency, setCurrency] = useState('CAD')
    const [page, setPage] = useState(1)
    const [resultPage, setresultPage] = useState(10)

    const { fav, setFav} = CryptoState;
    
    const navigate = useNavigate();
    
    const fetchCoins = async( _currency = 'CAD', _order ='gecko_desc' ) => {
        setLoading(true);
        const { data } = await axios.get(CoinList(_currency, _order))
        setCoins(data)
        setLoading(false);
    }
    
    useEffect( () => {
        fetchCoins(currency, orden);
    }, [currency, orden])
    
    const handleSearch = () =>{
        return coins.filter( 
            (f) => 
            f.name.toLowerCase().includes(search) || 
            f.symbol.toLowerCase().includes(search)
        )
    }

    const numberWithCommas = (x) => {
        return ( !!x ) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0.0;
      }

    const handleChangeCurrency = (e) => {
        e.preventDefault();
        setCurrency(e.target.value);
      };
    
    const handleChangeOrden = (e) => {
        e.preventDefault();
        setOrden(e.target.value);
      };

      const handleChangeResultByPage = (e) => {
        e.preventDefault();
        setresultPage(e.target.value);
      };


    return <Container>
    <Box sx={{
                display: 'grid',
                gridAutoColumns: 'auto',
                gap: 1,
                mt: 2,
                mb: 2
        }}>
        <TextField sx={{ gridRow: '1', gridColumn: 'span 1' }} label="Search for a Crypto" variant='outlined'
        onChange = { (e) => setSearch(e.target.value)}></TextField>

        <FormControl sx={{ gridRow: '1', gridColumn: '2 / 5', width: "50%" }}>
            <InputLabel id="select-label-currency">Select Currency</InputLabel>
            <Select labelId="select-label-currency" variant='outlined' label="Select Currency" 
                        onChange={handleChangeCurrency} value={currency}>
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ gridRow: '1', gridColumn: '4 / 5' }}>
            <InputLabel id="select-label-order">Select Order</InputLabel>
            <Select labelId="select-label-order" variant='outlined' label="Select Order" 
                        onChange={handleChangeOrden} value={orden}>
                <MenuItem value={"gecko_desc"}>Price Desc</MenuItem>
                <MenuItem value={"gecko_asc"}>Price Asc</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ gridRow: '1', gridColumn: '5 / 5' }}>
            <InputLabel id="select-label-page">Select Results By Page</InputLabel>
            <Select labelId="select-label-page" variant='outlined' label="Select Results By Page" 
                        onChange={handleChangeResultByPage} value={resultPage}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </FormControl>

    </Box>

    
    <TableContainer>
    {
        loading ? (
            <LinearProgress style={{ backgroundColor: "green"  }}></LinearProgress>
            ) : (
                <Table>
                <TableHead sx={{backgroundColor: "#EEBC1D"}}>
                <TableRow>
                {
                    [ "Coin", "Price", "24h Change", "Market Cap"].map( (head) => (
                        <TableCell
                        key={head}
                        sx = {{
                            textAlign:"center"
                        }}>
                        {head}
                        </TableCell>
                        ))
                    }
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        handleSearch()
                        .slice((page - 1) * resultPage, (page - 1) * resultPage + resultPage)
                        .map( row => {
                            const profit = row.price_change_percentage_24h > 0;
                            return (
                                <TableRow
                                onClick={() => navigate(`/coins/${row.id}`) }
                                key={row.name}
                                >
                                <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                    display: 'flex',
                                    gap:2,
                                }}>
                                <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                                />
                                <div
                                style={{ display: "flex", flexDirection: "column" }}
                                >
                                <span
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                }}
                                >
                                {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                {row.name}
                                </span>
                                </div>
                                </TableCell>
                                
                                <TableCell align="center"
                                style={{
                                    textAlign:"center"
                                }}>
                                $
                                {numberWithCommas(row.current_price?.toFixed(2))}
                                </TableCell>
                                <TableCell
                                align="right"
                                style={{
                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                    textAlign: "center"
                                }}
                                >
                                {profit && "+"}
                                {row.price_change_percentage_24h?.toFixed(2)}%
                                </TableCell>
                                <TableCell align="right"
                                sx={{
                                    textAlign: "center"
                                }}>
                                $
                                {numberWithCommas(
                                    row.market_cap?.toString().slice(0, -6)
                                    )}
                                    M
                                    </TableCell>
                                    
                                    </TableRow>
                                    )
                                })
                            }
                            </TableBody>
                            </Table>
                            )
                        }
                        </TableContainer>
                        <Pagination 
                        count = { handleSearch()?.length/resultPage.toFixed(0)}
                        onChange = { (_, value) => {
                            setPage(value);
                            window.scroll(0, 0)
                        }}
                        >

                        </Pagination>
                        </Container>
                    }
                    
                    export default CoinsTable