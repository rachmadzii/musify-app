import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import NavigationBar from './components/NavigationBar';
import CreatePlaylist from './pages/CreatePlaylist';
import Home from './pages/Home';
import Login from './pages/Login';
import { RootState } from './store';

function App() {
  const isAuthorized: boolean = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  return (
    <Router>
      {isAuthorized ? <NavigationBar /> : null}
      <Switch>
        <Route path="/home" exact>
          {isAuthorized ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route path="/create-playlist" exact>
          {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
