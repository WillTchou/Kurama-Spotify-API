import { Component } from 'react';
import {Badge,ListGroup} from 'react-bootstrap';
import {PlayCircle,PauseCircle,StopCircle} from 'react-bootstrap-icons';
import {Howl,Howler} from 'howler';
import Header from './Header';
import axios from 'axios';
import './css/Album.css'


export default class Album extends Component{


    constructor(props){
        Howler.autoUnlock = false; 
        super(props);
        this.state={
            error:null,
            isLoaded:false,
            isPause:true,
            name:"",
            images:[],
            total_tracks:{},
            release_date:"",
            artists:[],
            tracks:[],
        }
        this.playlist=[];
    }

    remplir=()=>{
            this.state.tracks.map((son)=>(
                    this.playlist.push(new Howl({
                        src:son.preview_url!=null? son.preview_url:"",
                        format:['mp3'],
                        html5: true,
                        autoplay:false,
                        volume: 0.6
                    })
                    )
                ))
    }


    componentDidMount() {

        let id=this.props.match.params.id;
        axios.get('https://api.spotify.com/v1/albums/'+id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('newToken')}` 
            }
            })
            .then((res)=>{
                this.setState({
                    isLoaded:true,
                    name:res.data.name,
                    images:res.data.images,
                    total_tracks:res.data.total_tracks,
                    release_date:res.data.release_date,
                    artists:res.data.artists,
                    tracks:res.data.tracks.items
                })
            },
                (error)=>{
                    this.setState({
                        isLoaded:true,
                        error
                    })
                })
                
        }


        duree=(ms)=> {
            var min = Math.floor((ms/1000/60) << 0);
            var sec = Math.floor((ms/1000) % 60);
            return min+":"+sec;
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
        
        toStop=(i)=>{
            this.playlist[i].stop();
            this.setState({isPause:true})
          } 

        
    

    render(){
        const {error,isLoaded,name,images,total_tracks,release_date,artists,tracks}=this.state;
        this.remplir();
        if (error) {
            return <div>Erreur : {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Chargement…</div>;
          } else {
            return (
                <div className="album">
                    <Header/>
                    <div className="desc-album">
                        <div className="image-album">
                            <img src={images[1].url} alt="album"/> 
                        </div>
                        <div className="det-album">
                            <h3>{name}</h3> 
                            <Badge variant="light">Par: </Badge>
                            {artists.map((artist)=>(
                                <Badge variant="danger">{artist.name}</Badge>
                            ))}
                            <i>{release_date} composé de {total_tracks} titres</i> 
                        </div>
                    </div>
                    <ListGroup>
                        {tracks.map((son,index)=>(
                            <ListGroup.Item key={index.toString()}> 
                                <div className="lecture">
                                    {this.state.isPause && <PlayCircle style={{cursor:'pointer'}} size={30} onClick={()=>this.toPlay(index)}/>}
                                    {!this.state.isPause && <PauseCircle style={{cursor:'pointer'}} size={30}  onClick={()=>this.toPause(index)} />}
                                    <StopCircle style={{cursor:'pointer'}} size={30}  onClick={()=>this.toStop(index)} />
                                </div>          
                                <div className="track-desc">
                                    <span className="nom-son">{son.name}</span>
                                    {son.artists.map((artist)=>(
                                        <Badge variant="danger">{artist.name}</Badge>
                                    ))}
                                </div>
                                <div className="track-duree">
                                    <span className="badge badge-light">{this.duree(son.duration_ms)}</span>
                                </div> 
                            </ListGroup.Item>
                        ))}
                    </ListGroup>              
                </div>
            )
        }
    }
    
}