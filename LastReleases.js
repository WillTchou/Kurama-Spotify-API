import React,{ useState,useEffect } from 'react';
import './css/LastReleases.css'
import {Badge} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { withRouter } from "react-router";


function LastReleases(){

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(()=>{
    axios.get("https://api.spotify.com/v1/browse/new-releases",{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('newToken')}` 
          }
          })
          .then(res=>{
            setIsLoaded(true);
            setAlbums(res.data.albums.items);
          },
          (error)=>{
            setIsLoaded(true);
            setError(error)
          })
    
  },[])
        
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement...</div>;
        } else {
          return (
            <div className="LastReleases">
                <Header/>
                <h1 className="text-center">Latest Releases</h1>
                    <div className="liste-albums">
                        {albums.map((item,index)=>(
                            <NavLink to={`/album/view/${item.id}`}>
                                <div className="carte" style={{ width: '20rem' }} key={index}>
                                  <img alt="album-img" src={item.images[1].url} />
                                  <div className="container">
                                      <Badge className="titre" variant="danger">{item.name}</Badge>
                                      <p>
                                          <Badge variant="light">Artist: </Badge>
                                          {item.artists.map((artist)=>(
                                              <Badge variant="danger">{artist.name}</Badge>
                                          ))} 
                                      </p>
                                  </div>
                                </div>
                            </NavLink>
                        ))}               
                    </div>
            </div>
        )
      }
    
}

export default withRouter(LastReleases);