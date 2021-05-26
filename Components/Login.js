import React from 'react';
import "./css/Login.css";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import {Button} from 'react-bootstrap';
import spotifyImg from './assets/spotify.jpg';

const Login = () => {
    return (
        <div className="Login">
            <img
                src={spotifyImg}
                alt="Spotify logo"
            />
            <Button variant="danger"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
                Login with Spotify
            </Button>
        </div>
    );
};

export default Login;