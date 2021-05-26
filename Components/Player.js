import React from "react";
import {PlayCircle,PauseCircle,StopCircle,BsSkipStart,BsSkipEnd} from 'react-bootstrap-icons';
import axios from 'axios';
import "./css/Player.css";

class Player extends Component{

  constructor(props){
    super(prop);
    this.state={
      item:{
        album:{
          images:[{url:""}]
        },
        name:"",
        artists:[{name:""}]
      },
      is_playing:false,
      progress_ms:0
    }
  }

  componentDidMount(){
    axios.get('https://api.spotify.com/v1/me/player/currently-playing',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('newToken')}` 
      }
    }).then(res=>{
        this.setState({
          is_playing:res.data.is_playing,
          progress_ms:res.data.progress_ms,
          item:res.data.item
        })
    })
  }

  toPlay=(i)=>{
    console.log('play');
    this.setState({isPause:false})
    this.playlist[i].play();
  }

toPause=(i)=>{
    console.log('pause');
    this.setState({isPause:true})
    this.playlist[i].pause()
  }

   backgroundStyles = {
    backgroundImage:`url(${props.item.album.images[0].url})`,
  };
  
   progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };
  
  render(){
    const {item,is_playing,progress_ms}=this.state;
    return (
      <div className="App">
        <footer>
          <div className="detail">
            <div className="titre">{item.name}</div>
            <div className="artisteNom">{item.artists.name}</div>
          </div>
          <div className="track">
            <div className="boutons">
              <BsSkipEnd/>

              <BsSkipStart/>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Player;