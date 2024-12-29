import React, { useRef, useState } from 'react';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const movieCard = ({details,cardClass}) => {
  const navigate = useNavigate();
  const cardRef=useRef();
  return (
    <div className={(cardClass ?  cardClass: "card") } ref={cardRef} onClick={()=>{navigate( details?.known_for?.[0] 
      ? `/UNWIND/details/${details.known_for[0].id}?tittle=movie` 
      : `/UNWIND/details/${details.id}?tittle=movie`);  window.scrollTo(0, 0)}}> 
      {details && <LazyLoadImage src={`https://image.tmdb.org/t/p/original/${details.poster_path || details.known_for[0].poster_path}`} className='lazy-load'/>}
      {details && <div className="rating">{details?.vote_average?.toFixed(1) || details.known_for[0].vote_average?.toFixed(1)}</div>}
    </div>
  )
}

export default movieCard
