import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Rating from '../Rating/Rating'

const Card = styled.div`
    border: solid 1px black;
    background-color: white;

`
const AirlineLogo= styled.div`
    width: 50px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
  
    img {
        
        height: 50px;
        width: 50px;
        border-radius: 100%;
        border: solid 1px black;
    }

`
const AirlineName = styled.div`
    padding: 20px 0 10px 0;

`
const LinkWrapper = styled.div`
    margin: 30px 0 20px 0;
    height: 50px;
    padding: 20px;
    a {
        color: white;
        background-color: black;
        border-radius: 4px;
        width: 100%;
        padding: 10px 50px;
    }

`


const Airline = (props) => {

    
    return (
        <Card>
            <AirlineLogo>
                <img src={props.attributes.image_url} alt={props.attributes.name} />
            </AirlineLogo>
            <AirlineName>{props.attributes.name}</AirlineName>
            <Rating score={props.attributes.avg_score} />
            <div className="airline-score">{props.attributes.avg_score}</div>
            <LinkWrapper>
                <Link to={`airlines/${props.attributes.slug}`} state={{data:props.attributes}}>view airline</Link>
            </LinkWrapper>
        </Card>
    )
}

export default Airline