import {Field, Form, Formik} from "formik";
import {RadioGroup, TextField} from "formik-material-ui";
import {Radio, Grid} from "@material-ui/core";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const RegisterUserForm = (props) => {
    return (
        <Formik
            initialValues={
                {
                    'username': '',
                    'password': '',
                    'passwordDup': '',
                    'userType': 'owner',
                    'name': '',
                    'firstLastName': '',
                    'secondLastName': '',
                    'address': '',
                    'phoneNumber': '',
                }
            }

            onSubmit={
                (values, formikActions) => {
                    props.handleRegister(values, formikActions);
                }
            }

            render={(props) => {
                let disableButton = (
                    (
                        props.isSubmitting
                        || props.values.username === ''
                        || props.values.password === ''
                        || props.values.password !== props.values.passwordDup
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
                                name={'passwordDup'}
                                label={'Confirm Password'}
                                type={'password'}
                                placeholder={'Confirm Password'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                component={TextField}
                            />

                            {/*<Field*/}
                            {/*name={'name'}*/}
                            {/*label={'Name'}*/}
                            {/*type={'text'}*/}
                            {/*placeholder={'Name'}*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*component={TextField}*/}
                            {/*/>*/}

                            {/*<Field*/}
                            {/*name={'firstLastName'}*/}
                            {/*label={'First Last Name'}*/}
                            {/*type={'text'}*/}
                            {/*placeholder={'First Last Name'}*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*component={TextField}*/}
                            {/*/>*/}

                            {/*<Field*/}
                            {/*name={'secondLastName'}*/}
                            {/*label={'Second Last Name'}*/}
                            {/*type={'text'}*/}
                            {/*placeholder={'Second Last Name'}*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*component={TextField}*/}
                            {/*/>*/}

                            {/*<Field*/}
                            {/*name={'address'}*/}
                            {/*label={'Address'}*/}
                            {/*type={'text'}*/}
                            {/*placeholder={'Address'}*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*component={TextField}*/}
                            {/*/>*/}

                            {/*<Field*/}
                            {/*name={'phoneNumber'}*/}
                            {/*label={'Phone Number'}*/}
                            {/*type={'text'}*/}
                            {/*placeholder={'phoneNumber'}*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*component={TextField}*/}
                            {/*/>*/}

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

                                Register

                            </Button>

                        </Grid>

                    </Form>
                )
            }}
        >
        </Formik>
    )
};

export default RegisterUserForm;