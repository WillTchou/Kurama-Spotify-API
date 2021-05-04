import React, { Component} from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LastReleases from './LastReleases';
import Album from './Album';
import NotFound from './NotFound';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import hash from "./hash";
import "./css/App.css";


class App extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      token: null,
  };
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      localStorage.setItem('newToken',_token)
    }
  }

  render(){
    return (      
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login}/> 
              <ProtectedRoute path="/" exact component={LastReleases}/>
              <Route path={"/album/view/:id"} render={(props)=><Album {...props}/>}/>
              <Route path="*" component={()=><NotFound/>}/>  
            </Switch>
          </BrowserRouter>
        </div>     
    )
  }

}

export default App;
