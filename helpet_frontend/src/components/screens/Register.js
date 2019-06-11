import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";
import {Typography} from "@material-ui/core";
import RegisterUserForm from "../forms/user/RegisterUserForm";
import Paper from "@material-ui/core/Paper";


function Register(props) {
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
                                style={{
                                    marginBottom: '1em',
                                }}

                            >
                                Register Form
                            </Typography>

                            <RegisterUserForm
                                handleRegister={props.handleRegister}
                            />

                        </Grid>

                    </Paper>

                </Grid>
            }

        </React.Fragment>
    );
}

export default Register;