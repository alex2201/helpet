import React, {Component} from 'react';
import {CircularProgress} from "@material-ui/core";

class LazyImage extends Component {
    styles = {
        imgContainer: {
            width: '100%',
            height: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        imgContainerLoading: {
            display: 'none',
        },

        img: {
            // margin: 'auto',
            width: 'auto',
            height: '100%',
        }

    };

    state = {
        imgLoaded: false,
        showLoad: true,
    };

    constructor(props) {
        super(props);

        const height = props.containerHeight;
        const avatar = props.avatar;

        if (height !== null) {
            this.styles.imgContainer.height = height;
        }

        if (avatar) {
            this.styles.img.borderRadius = '50%';
        }
    }

    handleImgLoad = () => {
        this.setState({
                imgLoaded: true,
                showLoad: true,
            }
        );
    };

    loadingImg = (
        <div style={this.styles.imgContainer}>
            <CircularProgress/>
        </div>
    );

    render() {

        return (
            <React.Fragment>
                <div style={!this.state.showLoad ? this.styles.imgContainerLoading : this.styles.imgContainer}>
                    <img
                        style={this.styles.img}
                        src={this.props.src}
                        alt={this.props.alt}
                        onLoad={this.handleImgLoad}
                    />
                </div>

                {!this.state.showLoad ? this.loadingImg : null}
            </React.Fragment>
        )
    }
}

export default LazyImage;