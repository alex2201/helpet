import React, {Component} from 'react';
import {Grid, List, ListItem, ListItemText, Paper, Typography} from "@material-ui/core";
import axios from 'axios';
import Link from "@material-ui/core/Link";
import PetCarnetModal from "../../modals/pet/PetCarnetModal";
import PetRegisterModal from "../../modals/pet/PetRegisterModal";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

class OwnerPetList extends Component {
    constructor(props) {
        super(props);
        this.selectedPet = null;
    }

    state = {
        petListLoaded: false,
        openPetCarnetModal: false,
        openPetRegisterModal: false,
        openRegisterSuccessSnack: false,
    };

    handleRegisterSnackClose = (event, reason) => {
        this.setState({
            openRegisterSuccessSnack: false,
        })
    };

    getPetList = () => {
        const username = this.props.user.username;
        axios.get(`api/user/owner/pet-list/${username}`).then(
            response => {
                if (response.status === 200) {
                    this.petList = response.data;
                    this.setState({
                        petListLoaded: true,
                    })
                }
            }
        )
    };

    handlePetRegister = (values, actions) => {
        values.username = this.props.user.username;
        axios.post('api/register/pet/', values)
            .then(
                response => {
                    if (response.status === 201) {
                        this.setState({
                            petListLoaded: false,
                            openPetRegisterModal: false,
                            openRegisterSuccessSnack: true,
                        })
                    } else {
                        alert('DB Connection Failed: Register pet.');
                        actions.setSubmitting(false);
                    }
                }).catch(error => {
            console.log(error);
            actions.setSubmitting(false);
        });
    };

    handleAppointmentSelect = (pet) => {
        this.selectedPet = pet;
        this.setState({
            openPetCarnetModal: true,
        });
    };

    handlePetCarnetModalClose = () => {
        this.setState({
            openPetCarnetModal: false,
        });
    };

    handleRegisterPetModalOpen = () => {
        this.setState({
            openPetRegisterModal: true,
        });
    };

    handlePetRegisterModalClose = () => {
        this.setState({
            openPetRegisterModal: false,
        });
    };

    render() {
        let petListComponent;

        if (!this.state.petListLoaded) {
            this.getPetList();
        }

        petListComponent = (
            <React.Fragment>
                {this.petList != null &&
                <List
                    component={'nav'}
                    style={{
                        overflow: 'auto',
                        maxHeight: '12em',
                    }}
                >

                    {
                        this.petList.map((pet) => {
                            return (
                                <ListItem
                                    button
                                    key={pet.pet_id}
                                    onClick={() => this.handleAppointmentSelect(pet)}
                                >

                                    <ListItemText
                                        primary={pet.pet_name}
                                        secondary={pet.species}
                                    />

                                </ListItem>)
                        })
                    }

                </List>
                }

                {
                    this.petList == null &&
                    <Typography>
                        No hay mascotas registradas.
                    </Typography>
                }

            </React.Fragment>
        );

        return (
            <React.Fragment>

                <Grid
                    container
                    justify={"space-between"}
                >

                    <Typography
                        variant={"h5"}
                        style={{
                            marginTop: '1em',
                            marginBottom: '1em',
                        }}
                    >
                        Mascotas:
                    </Typography>

                    <Typography
                        variant={"h5"}
                        style={{
                            marginTop: '1em',
                            marginBottom: '1em',
                        }}
                    >
                        <Link
                            component="button"
                            onClick={this.handleRegisterPetModalOpen}
                        >
                            Añadir (+)
                        </Link>

                    </Typography>


                </Grid>

                <Paper
                    style={{
                        width: '100%',
                    }}
                >

                    {petListComponent}

                </Paper>

                {
                    this.state.openPetCarnetModal
                    &&
                    <PetCarnetModal
                        open={true}
                        handleModalClose={this.handlePetCarnetModalClose}
                        pet={this.selectedPet}
                    />
                }

                {
                    this.state.openPetRegisterModal
                    &&
                    <PetRegisterModal
                        open={true}
                        handleModalClose={this.handlePetRegisterModalClose}
                        handlePetRegister={this.handlePetRegister}
                    />
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openRegisterSuccessSnack}
                    autoHideDuration={3000}
                    onClose={this.handleRegisterSnackClose}
                >
                    <SnackbarContent
                        // aria-describedby="client-snackbar"
                        message={
                            "Mascota Registrada"}
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit"
                                        onClick={this.handleRegisterSnackClose}>
                                <CloseIcon/>
                            </IconButton>,
                        ]}
                    />
                </Snackbar>

            </React.Fragment>
        );
    }
}

export default OwnerPetList;