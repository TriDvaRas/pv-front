/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.sass';
import Navbar from './features/nav/Navbar';
import Reset from './features/reset/Reset';
import BracketMenu from './pages/BracketMenu';
import PlayersMenu from './pages/PlayersMenu';
import TeamsMenu from './pages/TeamsMenu';
function App() {
    return (
        <div id='app' className="mh-100">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to='/players' />
                    </Route>
                    <Route exact path="/players">
                        <Container>
                            <PlayersMenu />
                        </Container>
                    </Route>
                    <Route exact path="/teams">
                        <Container>
                            <TeamsMenu />
                        </Container>
                    </Route>
                    <Route exact path="/bracket">
                        <Container fluid>
                            <BracketMenu />
                        </Container>
                    </Route>
                    <Route exact path="/reset">
                        <Container  >
                            <Reset />
                        </Container>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
