import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchBar from "../SearchBar";
import LazyImage from "../misc/LazyImage";

class Main extends React.Component {
    logoImg = require('../../media/image/helpet_logo.png');

    render() {
        return (
            <React.Fragment>

                <Grid
                    container
                    direction={"column"}
                    justify={"center"}
                    alignItems={"center"}
                    wrap={"nowrap"}
                    style={{
                        padding: '1em',
                    }}
                >

                    <SearchBar/>

                    <LazyImage
                        src={this.logoImg}
                        alt={'logo'}
                        containerHeight={'400px'}
                        style={{
                            marginTop: '1em',
                        }}
                    />

                    <Typography
                        variant={'h4'}
                    >
                        Te ayudamos a ayudar
                    </Typography>

                </Grid>
            </React.Fragment>
        );
    }
}

export default Main;