import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton, InputBase} from "@material-ui/core";

function SearchBar() {
    return (
        <React.Fragment>

            <div
                style={{
                    backgroundColor: '#D3D3D3',
                    padding: '8px',
                    borderRadius: '1em',
                    borderColor: '#D3D3D3',
                    width: '100%',
                    maxHeight: '30px',
                    display: "flex",
                }}
            >

                <InputBase
                    placeholder="Buscar veterinarios…"
                    style={{
                        flexGrow: 1,
                    }}
                />

                <IconButton
                    style={{
                        flexGrow: 0,
                        margin: 'auto',
                        padding: '.1%',
                    }}
                >

                    <SearchIcon/>

                </IconButton>

            </div>

        </React.Fragment>
    );
}

export default SearchBar;