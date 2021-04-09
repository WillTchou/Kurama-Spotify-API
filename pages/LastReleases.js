import React,{ useState,useEffect } from 'react';
import './css/LastReleases.css'
import {Card,Badge} from 'react-bootstrap';
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
                                <Card className="carte" style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={item.images[1].url} />
                                <Card.Body>
                                    <Badge className="titre" variant="danger">{item.name}</Badge>
                                    <Card.Text>
                                        <Badge variant="light">Artist: </Badge>
                                        {item.artists.map((artist)=>(
                                            <Badge variant="danger">{artist.name}</Badge>
                                        ))} 
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            </NavLink>
                        ))}               
                    </div>
            </div>
        )
      }
    
}

export default withRouter(LastReleases);