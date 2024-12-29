import React, { useEffect, useState } from "react";

import "./styles.scss";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { fetchMovieDetails } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ModalVideo from 'react-modal-video'
import Card from '../../components/card/movieCard';
import {HiPlay} from 'react-icons/hi'
const details = (props) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tittle = searchParams.get("tittle");

  const [isOpen, setOpen] = useState(false)
  const [details, setDetails] = useState(null);
  const [videoList, setVideoList] = useState(null);
  const [movieList, setmovieList] = useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(tittle, id).then((data) => {
      setDetails(data);
      setLoading(false);
    });
    let type = "/videos";
    fetchMovieDetails(tittle, id, type).then((data) => {
      setVideoList(data.results);
    });
    type = "/recommendations";
    fetchMovieDetails(tittle, id, type).then((data) => {
      setmovieList(data.results);
    });
  }, [id]);
  return (
    loading ? <div className="loading"><img src="https://i.gifer.com/ZZ5H.gif" alt="Loading.." srcset="" /></div>:
    <div className="container">
      <div className="banner">
      {details && <LazyLoadImage
              src={import.meta.env.VITE_IMAGE_URL + details.backdrop_path}
              className="lazy-load background"
            />}
        <div className="opacityLayer"></div>
        <div className="poster">
          {details && (
            <LazyLoadImage
              src={import.meta.env.VITE_IMAGE_URL + details.poster_path}
              className="lazy-load"
            />
          )}
        </div>
        {details && (
          <div className="details">
            <h3 className="heading">{details.original_title}</h3>
            <div className="genre">
            {details && details.genres.map((item,index)=>{
              return <div key={index} className="genreItem">{item.name}</div>
            })}
            </div>
            <p className="overview">{details.overview}</p>

            <span className="rating">Rating:<p >{details.vote_average.toFixed(1)}</p></span>
            
            <span className="contain">
              
            <span className="status">Status: {details.status}</span>
            {videoList && videoList[0] && <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={videoList[0].key} onClose={() => setOpen(false)} />}
			      <span className="trailerButton" onClick={()=> setOpen(true)}><HiPlay/> Watch Trailer</span>
            </span>
          </div>
        )} 
      </div>
      <div className="similar">Recommended</div>
      <div className="movieList">
      {movieList && movieList.map((item, index) => {
        return <Card key={index} cardClass={"cardOverride"} details={item} />;
      })}
      </div>
    </div>
  );
};

export default details;
