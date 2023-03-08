import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [fav, setFav] = useState([])
    
  return (
    <Crypto.Provider value={{fav, setFav}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}