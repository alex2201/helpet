import React from 'react';
import {Typography, Grid, Paper} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import LoginForm from "../forms/user/LoginForm";


const Login = (props) => {
    return (
        <React.Fragment>

            {
                props.logged &&

                <Redirect to={'/profile'}/>
            }
            {
                !props.logged &&

                <Grid
                    container
                    justify={'center'}
                    alignContent={'center'}
                    style={{
                        height: '100%',
                    }}
                >
                    <Paper
                        style={{
                            margin: '2em',
                            width: '90%',
                        }}
                    >
                        <Grid
                            container
                            justify={'center'}
                            alignContent={'center'}
                            direction={'column'}
                            style={{
                                marginTop: '1em',
                                marginBottom: '1em',
                            }}
                        >

                            <Typography
                                variant={"h4"}
                            >
                                Login
                            </Typography>

                            <LoginForm
                                handleLogin={props.handleLogin}
                            />

                        </Grid>

                    </Paper>

                </Grid>
            }
        </React.Fragment>
    );
};

export default Login;