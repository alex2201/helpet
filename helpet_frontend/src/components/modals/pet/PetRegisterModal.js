import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import RegisterPetForm from "../../forms/user/RegiterPetForm";
import Modal from "@material-ui/core/Modal";

function PetRegisterModal(props) {
    return (
        <React.Fragment>
            <Modal
                open={props.open}
                onEscapeKeyDown={props.handleModalClose}
            >
                <Paper
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: 'auto',
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
                            variant={'h4'}
                        >
                            Registro Mascota
                        </Typography>

                        <RegisterPetForm handleRegister={props.handlePetRegister}/>

                    </Grid>

                </Paper>
            </Modal>
        </React.Fragment>
    );
}

export default PetRegisterModal;