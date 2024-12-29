import React, { useEffect, useState } from 'react'
import './styles.scss'
import Card from '../card/movieCard'
import Carousel from 'react-multi-carousel';
import responsive from '../../assets/carouselResponsive';

import 'react-multi-carousel/lib/styles.css';
const ContentSection = ({items,tittle}) => {
  const [dummy,setdummy]=useState(Array(20).fill(0));
  return (
    <div className='contentSection'>
    {tittle && <div className="tittle">{tittle}</div>}
        <Carousel responsive={responsive} itemClass='content' autoPlay={true} autoPlaySpeed={3000} shouldResetAutoplay={true}   slidesToSlide={2}  focusOnSelect={true} rewind={true} rewindWithAnimation={true} customTransition='transform 1000ms ease-in-out'>
          {items ? items.map((item,index)=>{
            if(item.known_for){
              return(<Card key={item.id} details={item?.known_for[0]} />)
            }else{
              return(<Card key={item.id} details={item} />)
            }
          }):<Card/>}
          {!items && dummy.map((item,index)=>{
            return(<Card key={index} />)
          })}
        </Carousel>
    </div>
  )
}

export default ContentSection
