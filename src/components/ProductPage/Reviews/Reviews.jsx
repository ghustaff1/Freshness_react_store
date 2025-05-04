import React from 'react'
import styled from 'styled-components';
import Rating from '../../Rating/Rating';

const Reviews = ({reviews}) => {
  console.log(reviews)

  return (
    <ul className="reviews">
      {reviews && reviews.map(obj=>
        <li key={obj.name} className="review">
            <div className="review__person">
              <div className="review__img">
                <img src={obj.imgUrl} alt="img" />
              </div>
              <p className='review__name'>{obj.name}</p>
            </div>
            <div className="review__rate">
            <Rating itemName={obj.name+'review'} rate='4' color='gold'/>
            </div>
        </li>
        )}
    </ul>
  )
}

export default Reviews