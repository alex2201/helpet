import React, {Component} from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

class AppointmentDetailModal extends Component {
    constructor(props) {
        super(props);
        this.appointment = props.appointment;
    }

    render() {
        return (
            <React.Fragment>

                <Modal
                    open={this.props.open}
                    onEscapeKeyDown={this.props.handleModalClose}
                >
                    <Paper
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '80%',
                            minWidth: '30%',
                            padding: '2em',
                            height: 'auto',
                        }}
                    >

                        <Grid
                            container
                            justify={'center'}
                            alignContent={'center'}
                            direction={'column'}
                            wrap={'nowrap'}
                        >

                            <Typography
                                variant={'h1'}
                                align={"center"}
                                style={{
                                    marginBottom: '0.5em',
                                }}
                            >
                                {this.appointment.pet_name}
                            </Typography>

                            <Typography
                                variant={'h5'}
                                style={{
                                    marginBottom: '0.5em',
                                }}
                            >
                                {'Fecha: ' + this.appointment.date_id}
                            </Typography>

                            <Typography
                                variant={'h5'}
                                style={{
                                    marginBottom: '0.5em',
                                }}
                            >
                                {'Estado: '+this.appointment.status}
                            </Typography>

                            <Typography
                                variant={'h4'}
                                style={{
                                    marginBottom: '0.5em',
                                }}
                            >
                                Síntomas:
                            </Typography>

                            <Typography
                                variant={'body1'}
                                style={{
                                    marginBottom: '0.5em',
                                }}
                            >
                                {this.appointment.symptoms}
                            </Typography>

                        </Grid>

                    </Paper>

                </Modal>

            </React.Fragment>
        );
    }
}

export default AppointmentDetailModal;