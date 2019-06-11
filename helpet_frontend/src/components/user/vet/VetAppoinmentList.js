import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import {List, ListItem, ListItemText} from "@material-ui/core";
import AppointmentDetailModal from "../../modals/vet/AppointmentDetailModal";

class VetAppoinmentList extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     // this.appointmentList = null;
    // }

    state = {
        appointmentListLoaded: false,
        openAppointmentDetailModal: false,
    };

    appointmentList = [
        {
            id: 3,
            date_id: '2019-06-24',
            symptoms: 'duerme todo el día',
            status: 'Pendiente',
            pet_id: 2,
            pet_name: 'Roxy',
            vet_id: 'petlover'
        },
        {
            id: 2,
            date_id: '2018-12-11',
            symptoms: 'arrastra la cola',
            status: 'Hecho',
            pet_id: 3,
            pet_name: 'Jack',
            vet_id: 'petlover'
        },
        {
            id: 1,
            date_id: '2018-10-12',
            symptoms: 'convulsiones',
            status: 'Hecho',
            pet_id: 3,
            pet_name: 'Jack',
            vet_id: 'petlover'
        },
    ];

    getAppointmentList = () => {
        const username = this.props.user.username;
        axios.get(`api/user/owner/pet-list/${username}`).then(
            response => {
                if (response.status === 200) {
                    this.appointmentList = response.data;
                    this.setState({
                        petListLoaded: true,
                    })
                }
            }
        )
    };

    handleAppointmentSelect = (appointment) => {
        this.selectedAppointment = appointment;
        this.setState({
            openAppointmentDetailModal: true,
        });
    };

    handleAppointmentDetailModalClose = () => {
        this.setState({
            openAppointmentDetailModal: false,
        });
    };

    render() {
        let appointmentContent = (
            <React.Fragment>
                {/*{this.petList != null &&*/}
                <List
                    component={'nav'}
                    style={{
                        overflow: 'auto',
                        maxHeight: '12em',
                    }}
                >

                    {
                        this.appointmentList.map((appointment) => {
                            return (
                                <ListItem
                                    button
                                    key={appointment.id}
                                    onClick={() => this.handleAppointmentSelect(appointment)}
                                >

                                    <ListItemText
                                        primary={appointment.pet_name}
                                        secondary={appointment.date_id}
                                    />

                                </ListItem>)
                        })
                    }

                </List>
                {/*}*/}

            </React.Fragment>
        );

        if (!this.state.appointmentListLoaded) {
            // getAppointmentList();
        }

        return (
            <React.Fragment>
                <Typography
                    variant={'h5'}
                >
                    Registro de Citas:
                </Typography>

                {appointmentContent}

                {
                    this.state.openAppointmentDetailModal
                    &&
                    <AppointmentDetailModal
                        open={true}
                        handleModalClose={this.handleAppointmentDetailModalClose}
                        appointment={this.selectedAppointment}
                    />
                }
            </React.Fragment>
        );
    }
}

export default VetAppoinmentList;