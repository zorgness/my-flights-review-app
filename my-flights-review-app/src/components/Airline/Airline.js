import axios from "axios";
import React, {useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Header from "./Header";
import Review from "./Review";
import ReviewForm from "./ReviewForm";


const Wrapper = styled.div`

  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  
`

const Column = styled.div`
  
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`

const Main = styled.div`
  padding-left: 60px;
`



const Airline = () => {
    const data = useParams()
    const slug = data.slug
    const [airline, setAirline] = useState({})
    const [reviews, setReviews] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)

    
    useEffect(() => {
        const url = `http://127.0.0.1:3000/api/v1/airlines/${slug}`
        axios.get(url)
        .then(resp => {

            setAirline(resp.data)
            setLoaded(true)
            setReviews(resp.data.included)
        }).catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
      e.preventDefault()
      // console.log("name:", e.target.name, 'value:', e.target.value)
      setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

      

    }
    const handleSubmit = (e) => {
      const airline_id = parseInt(airline.data.id)
      e.preventDefault()
      // const csrfToken = document.querySelector("[name= csrf-token]").content
      // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

      
      axios.post("http://127.0.0.1:3000/api/v1/reviews/",{...review, airline_id})
      .then(resp => {
        // debugger
        const included = [...airline.included, resp.data.data]
        setAirline({...airline, included})
        // setReviews({...review, resp.data.data})
        setReview({title:'', description:'', score: 0})

      } ).catch(err => {
          console.log(err)
      } )
    }

    const setRating = (score,e) => {
      e.preventDefault()
      // debugger
      setReview({...review, score})

    }

    
     let userReviews;
     if (loaded && airline.included) {

      userReviews = airline.included.map((item, index) => {
        
        return(
          <Review 
          key={index}
          attributes={item.attributes}
  
          />
        )
      })

     }
   
    return (
        <Wrapper>
            {
            loaded && 
            <Fragment  >
              <Column>
                <Main>
                    <Header 
                    attributes={airline.data.attributes} 
                    reviews={reviews}/>
                    {userReviews}
                  </Main>
              </Column>
           

            <Column>
              <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit} 
              setRating={setRating}
              attributes={airline.data.attributes}
              review={review}
              />
            </Column>
            </Fragment>}

            
        </Wrapper>
        
    )
}

export default Airline