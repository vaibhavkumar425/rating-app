import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  display: flex;
  flex-direction: column;
  margin: 23px;
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const CloseImage = styled.img`
  display: flex;
  flex-direction: column;
  margin: 20px;
  object-fit: cover;
  height: 40px;
  width: 40px
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [meta, setmeta] = useState();
  const { selectedMovie } = props;
  
  useEffect(async() => {
    try {
      const details = await Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=2f0bbf02`)
      setMovieInfo(details.data)
      const omicron = await Axios.get(`https://imdb-api.com/API/Ratings/k_8orrfwj5/${selectedMovie}`)
      setmeta(omicron.data)
    } catch (error) {
      console.log("error calling api",error) ;
    }
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Votes: <span>{movieInfo?.imdbVotes}</span>
            </MovieInfo>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}/10</span>
            </MovieInfo>
            {meta?.rottenTomatoes && <MovieInfo>
              Rotten Tomatoes Rating: <span>{meta?.rottenTomatoes}%</span>
            </MovieInfo>}
            {meta?.metacritic && <MovieInfo>
            Metacritic Rating: <span>{meta?.metacritic}/100</span>
            </MovieInfo>}
            {meta?.theMovieDb && <MovieInfo>
            TMDB Rating: <span>{meta?.theMovieDb}/10</span>
            </MovieInfo>}
            {meta?.filmAffinity && <MovieInfo>
            Film Affinity Rating: <span>{meta?.filmAffinity}/10</span>
            </MovieInfo>}
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
          </InfoColumn>
          <CloseImage onClick={() => props.onMovieSelect()} src={"https://cdn2.iconfinder.com/data/icons/flat-icons-web/40/Remove-512.png"} alt={"close"} />
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
