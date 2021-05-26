import React from 'react';
import {Badge} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './css/Header.css';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state={value:'',
                    results:[]};
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value});
        axios.get("https://api.spotify.com/v1/search?q="+this.state.value+"&type=album&market=FR&limit=6&offset=5",{
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('newToken')}`
                } 
                })
                .then((res)=>{
                    this.setState({results:res.data.albums.items});
                    if(this.state.value==='')    this.setState({results:[]});
                })
    }


    logout=()=>{
        localStorage.clear();
        window.location.href="/login"
    }

    render(){
        const {value,results}=this.state;
        return (
            <div className="Header">
                <header> 
                    <nav>                                                
                        <ul className="pages">
                            <li>
                            <p>Kurama</p>
                            </li>
                            <li>
                                <NavLink exact to="/" className="nav_link">
                                    Last Releases
                                </NavLink>
                            </li>
                           <li>
                                <p onClick={this.logout}>
                                    logout
                                </p>
                            </li>
                        </ul>     
                    </nav>
                    <div className="form-search"> 
                                    <input 
                                        type="text" 
                                        placeholder="Search an album..." 
                                        value={value}
                                        onChange={this.handleChange}
                                    />                      
                    </div> 
                </header>             
                <ul className="search-album">
                            {results.map((result,index)=>(
                                    <li className="search-album-item" key={index.toString()}>
                                        <a href={`/album/view/${result.id}`}>
                                            <div className="resultat">
                                                <img src={result.images[2].url} alt="img-alb" width="64" height="64"/>
                                                <div className="album-desc">
                                                    <Badge variant="danger" class="album-name">
                                                        {result.name}
                                                    </Badge>
                                                    <p id="date">({result.release_date})</p>
                                                </div>
                                            </div>
                                        </a>                                      
                                    </li>
                            ))}
                </ul> 
            </div>
        )
    }
    
}

Headers.PropTypes={
    event:PropTypes.event
}
