import React, {useState, useEffect} from "react";
import axios from "axios";
import Airline from "./Airline";
import styled from 'styled-components'



const Home = styled.div`
    text-align: center;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
`

const Header = styled.div`
    padding: 100px 100px 10px 100px;
    h1 {
        font-size: 42px
    }
`

const Subheader= styled.div`
    font-weight: 300q;
    font-size: 26px;
    
`

const Grid = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px 30px;
    

`



const Airlines = () => {
    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        //get all airlines from API
        // update airlines in our state

        axios.get('http://localhost:3000/api/v1/airlines')
        .then(resp => {
            setAirlines(resp.data.data)
        }).catch(err => console.log(err))

    }, [airlines.length])

    

    const grid = airlines.map(item => {
        return (
            <Airline
            key={item.attributes.name}
            attributes={item.attributes}
             />
        )
    })

    return (
        <Home>
            <Header>
                <h1>Open flights</h1>
                <Subheader>Honest airlines review</Subheader>
            </Header>
            <Grid>
                { grid }
            </Grid>
        </Home>
        
    
    )
}

export default Airlines