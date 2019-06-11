import {Field, Form, Formik} from "formik";
import {RadioGroup, TextField} from "formik-material-ui";
import {Radio} from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={
                {
                    'username': '',
                    'password': '',
                    'userType': 'owner',
                }
            }

            onSubmit={
                (values, formikActions) => {
                    props.handleLogin(values, formikActions);
                }
            }

            render={(props) => {
                let disableButton = (
                    (
                        props.isSubmitting
                        || props.values.username === ''
                        || props.values.password === ''
                    )
                );

                return (
                    <Form>

                        <Grid
                            container
                            justify={'center'}
                            direction={"column"}
                        >

                            <Field
                                name={'username'}
                                label={'Username'}
                                type={'text'}
                                placeholder={'Username'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                component={TextField}
                            />

                            <Field
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                placeholder={'Password'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                component={TextField}
                            />

                            <Field
                                name={'userType'}
                                placeholder={'User Type'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                render={(props) => {
                                    return (
                                        <RadioGroup {...props.field} aria-label="User Type">
                                            <FormControlLabel value="owner" control={<Radio/>} label="Owner"/>
                                            <FormControlLabel value="vet" control={<Radio/>} label="Vet"/>
                                        </RadioGroup>
                                    )
                                }
                                }
                            />


                            <Button
                                variant="contained"
                                color="primary"
                                disabled={disableButton}
                                onClick={props.submitForm}
                            >

                                Login

                            </Button>

                        </Grid>

                    </Form>
                )
            }}
        >
        </Formik>
    )
};

export default LoginForm;