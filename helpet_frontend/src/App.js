import React, {Component} from 'react';
import {Toolbar, Grid, Typography, Button, AppBar} from "@material-ui/core";
import {HashRouter, NavLink, Route, Link} from "react-router-dom";
import Main from "./components/screens/Main";
import Register from "./components/screens/Register";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import axios from 'axios';
import isEmptyJSON from "./core/functions/EmptyJSON";


class App extends Component {
    state = {
        logged: false,
    };

    user = {};

    handleRegister = (values, actions) => {
        const data = {
            username: values.username,
            password: values.password,
            is_active: true,
        };

        axios.post(`api/register/${values.userType}/`, data)
            .then(
                response => {
                    if (response.status === 201) {

                        this.handleAfterLogin(values);
                    } else {
                        alert('DB Connection Failed: Register user.');
                        actions.setSubmitting(false);
                    }
                }).catch(error => {
            console.log(error);
            actions.setSubmitting(false);
        });
    };

        handleAfterLogin = (values) => {
        axios.get(`/api/auth/user/${values.userType}/${values.username}/${values.password}/`)
            .then(
                response => {
                    if (response.status === 200) {
                        let logged;
                        let user;

                        if (!isEmptyJSON(response.data)) {
                            logged = true;
                            user = response.data[0];
                            user.userType = values.userType;
                        } else {
                            logged = false;
                            alert('Incorrect user/password combination.');
                        }

                        this.setState({
                            logged: logged,
                            user: user,
                        });
                    } else {
                        alert('DB Connection Failed: Authenticate user.')
                    }

                }).catch(error => {
            console.log(error);
        });
    };

    handleLogin = (values, actions) => {
        axios.get(`/api/auth/user/${values.userType}/${values.username}/${values.password}/`)
            .then(
                response => {
                    if (response.status === 200) {
                        let logged;
                        let user;

                        if (!isEmptyJSON(response.data)) {
                            logged = true;
                            user = response.data[0];
                            user.userType = values.userType;
                        } else {
                            logged = false;
                            alert('Incorrect user/password combination.');
                            actions.setSubmitting(false);
                        }

                        this.setState({
                            logged: logged,
                            user: user,
                        });
                    } else {
                        alert('DB Connection Failed: Authenticate user.')
                    }

                    actions.setSubmitting(false);
                }).catch(error => {
            console.log(error);
            actions.setSubmitting(false);
        });
    };

    handleLogout = () => {
        this.setState({
            logged: false,
            user: null,
        })
    };

    registerBtn = (
        <Button
            color="inherit"
            component={Link}
            to={'/register'}
        >
            Register
        </Button>
    );

    loginBtn = (
        <Button
            color="inherit"
            component={Link}
            to={'/login'}
        >
            Login
        </Button>
    );

    profileBtn = (
        <Button
            color="inherit"
            component={Link}
            to={'/profile'}
        >
            Profile
        </Button>
    );

    logoutBtn = (
        <Button
            color="inherit"
            onClick={this.handleLogout}
        >
            Logout
        </Button>
    );

    render() {
        return (
            <HashRouter>

                <Grid
                    container
                >

                    <AppBar position='static'>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                color="inherit"
                                style={{flexGrow: 1}}
                            >
                                <NavLink
                                    to={'/'}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                >

                                    Helpet

                                </NavLink>
                            </Typography>

                            {!this.state.logged && (
                                <div style={{
                                    display: 'flex',
                                    alignContent: 'space-between'
                                }}
                                >
                                    {this.registerBtn}
                                    {this.loginBtn}
                                </div>
                            )}
                            {this.state.logged && (
                                <div style={{
                                    display: 'flex',
                                    alignContent: 'space-between'
                                }}
                                >
                                    {this.profileBtn}
                                    {this.logoutBtn}
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>

                    <Route exact path="/" component={Main}/>

                    <Route exact path="/register" render={(props) =>
                        <Register
                            logged={this.state.logged}
                            handleRegister={this.handleRegister}
                        />}
                    />

                    <Route exact path="/profile" render={(props) =>
                        <Profile {...props}
                                 logged={this.state.logged}
                                 user={this.state.user}
                        />}
                    />

                    <Route exact path="/login" render={(props) =>
                        <Login
                            {...props}
                            logged={this.state.logged}
                            handleLogin={this.handleLogin}
                        />}
                    />

                </Grid>

            </HashRouter>
        );
    }
}

export default App;
