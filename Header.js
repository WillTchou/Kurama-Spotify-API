import React from 'react';
import {Navbar,Nav,ListGroup,Badge} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import {NavLink} from 'react-router-dom';
import './css/Header.css';
import axios from 'axios';

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
                    this.setState({results:res.data.albums.items})
                })
    }

    render(){
        const {value,results}=this.state;
        return (
            <div className="Header">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>Kurama</Navbar.Brand>
                    <Nav className="pages">
                            <Nav.Link>
                                <NavLink exact to="/" ClassName="nav_link">
                                    Last Releases
                                </NavLink>
                            </Nav.Link>
                    </Nav>
                    <div className="form-search">  
                        <Search className="loupe"/>            
                        <input 
                                type="text" 
                                placeholder="Search an album..." 
                                value={value}
                                onChange={this.handleChange}
                                className="cherche"
                        />                      
                    </div>   
                </Navbar>
                <ListGroup className="list-album">
                            {results.map((result,index)=>(
                                <NavLink to={`/album/view/${result.id}`}>
                                    <ListGroup.Item className="list-album-item" key={index.toString()}>
                                        <img src={result.images[2].url} alt="img-alb" width="64" height="64"/>
                                        <div className="album-desc">
                                            <Badge variant="danger" class="album-name">
                                                {result.name}
                                            </Badge>
                                            <p>{result.release_date}</p>
                                        </div>                                      
                                    </ListGroup.Item>
                                </NavLink>
                            ))}
                </ListGroup> 
            </div>
        )
    }
    
}
