import {Field, Form, Formik} from "formik";
import {RadioGroup, TextField} from "formik-material-ui";
import {Button, FormControlLabel, FormLabel, Grid, MenuItem, Radio, Select} from "@material-ui/core";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";

const hasEmptyString = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
            return true;
        }
    }

    return false
};

const RegisterPetForm = (props) => {
    return (
        <Formik
            initialValues={
                {
                    'pet_name': '',
                    'born_date': '',
                    'gender': 'M',
                    'species': 'CAN',
                }
            }

            onSubmit={
                (values, formikActions) => {
                    props.handleRegister(values, formikActions);
                }
            }

            render={(props) => {
                const disableButton = hasEmptyString(props.values);

                return (
                    <Form>

                        <Grid
                            container
                            justify={'center'}
                            direction={"column"}
                        >

                            <Field
                                name={'pet_name'}
                                label={'Nombre'}
                                type={'text'}
                                placeholder={'Nombre de la mascota'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                component={TextField}
                            />

                            <Field
                                name={'born_date'}
                                label={'Fecha Nacimiento'}
                                type={'date'}
                                placeholder={'Fecha Nacimiento'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                component={TextField}
                            />

                            <Field
                                name={'gender'}
                                placeholder={'Género'}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                render={(props) => {
                                    return (
                                        <React.Fragment>
                                            <FormLabel htmlFor="gender" component="legend">Género</FormLabel>
                                            <RadioGroup {...props.field}>
                                                <FormControlLabel value="M" control={<Radio/>} label="Macho"/>
                                                <FormControlLabel value="F" control={<Radio/>} label="Hembra"/>
                                            </RadioGroup>
                                        </React.Fragment>
                                    )
                                }
                                }
                            />

                            <Field
                                name={'species'}
                                fullWidth
                                margin="normal"
                                render={(props) => {
                                    return (
                                        <React.Fragment>
                                            <InputLabel htmlFor="species" component={'legend'}>Especie</InputLabel>
                                            <Select {...props.field}>
                                                <MenuItem value="AVE">Ave</MenuItem>
                                                <MenuItem value="CAN">Canino</MenuItem>
                                                <MenuItem value="REP">Reptil</MenuItem>
                                                <MenuItem value="FEL">Felino</MenuItem>
                                            </Select>
                                        </React.Fragment>
                                    )
                                }}
                            >
                            </Field>


                            <Button
                                variant="contained"
                                color="primary"
                                disabled={disableButton}
                                onClick={props.submitForm}
                            >

                                Registrar Mascota

                            </Button>

                        </Grid>

                    </Form>
                )
            }}
        >
        </Formik>
    )
};

export default RegisterPetForm;