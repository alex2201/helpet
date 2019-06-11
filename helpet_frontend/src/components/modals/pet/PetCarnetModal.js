import axios from "axios";
import React, {Component} from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

class PetCarnetModal extends Component {
    constructor(props) {
        super(props);
        this.rowsPerPage = 5;
        this.pet = props.pet;
        this.petVaccines = null;
        this.getPetData()
    }

    state = {
        page: 0,
    };

    getPetData = () => {
        const petId = this.pet.pet_id;

        axios.get(`api/user/owner/pet-data/${petId}`).then(
            response => {
                if (response.status === 200) {
                    this.petVaccines = Object.keys(response.data)
                        .filter(
                            key => key !== 'pet_id'
                                && key !== 'pet_name'
                                && key !== 'born_date'
                        );
                    this.setState({
                        page: 0,
                    })
                }
            }
        )
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        })
    };

    render() {
        let tableContent;
        let dataLenght = 0;

        if (this.petVaccines !== null) {
            dataLenght = this.petVaccines.length;

            tableContent = this.petVaccines
                .slice(this.state.page * this.rowsPerPage, this.state.page * this.rowsPerPage + this.rowsPerPage)
                .map((key) => {
                    return (
                        <TableRow
                            hover
                            key={key}
                        >

                            <TableCell
                                align={'left'}
                            >
                                {key}
                            </TableCell>

                            <TableCell
                                align={'right'}
                            >
                                {this.petVaccines[key] === true ? 'Listo' : 'Pendiente'}
                            </TableCell>

                        </TableRow>
                    )
                });
        }

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
                                variant={'h3'}
                            >
                                {this.pet.pet_name}
                            </Typography>
                            <Typography
                                variant={"body1"}
                            >
                                {`Especie: ${this.pet.species}`}
                            </Typography>

                            <Typography
                                variant={"body1"}
                            >
                                {`Género: ${this.pet.gender}`}
                            </Typography>

                            <Typography
                                variant={"h5"}
                            >
                                {"Vacunas:"}
                            </Typography>

                            <Paper
                                style={{
                                    maxHeight: '300px',
                                }}
                            >

                                <Table>

                                    <TableHead>

                                        <TableRow>

                                            <TableCell
                                                variant={'head'}
                                            >
                                                Vacuna
                                            </TableCell>

                                            <TableCell
                                                align={'right'}
                                                variant={'head'}
                                            >
                                                Estado
                                            </TableCell>

                                        </TableRow>

                                    </TableHead>

                                    <TableBody>

                                        {tableContent}

                                    </TableBody>

                                </Table>

                            </Paper>

                            <TablePagination
                                component="div"
                                count={dataLenght}
                                rowsPerPage={this.rowsPerPage}
                                rowsPerPageOptions={[]}
                                page={this.state.page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                            />

                        </Grid>

                    </Paper>
                </Modal>
            </React.Fragment>
        );
    }
}

export default PetCarnetModal;