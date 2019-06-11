import React from 'react';
import {Redirect} from "react-router-dom";
import {Grid, Paper, Typography} from "@material-ui/core";
import LazyImage from "../misc/LazyImage";
import OwnerPetList from "../user/owner/OwnerPetList";
import VetAppoinmentList from "../user/vet/VetAppoinmentList";

function Profile(props) {
    let profileImgPath;

    if (props.logged) {
        let userData = props.user.userType === 'vet' ? props.user.uservetdata : props.user.userownerdata;

        const rootPath = 'http://localhost:8000/static/resources/users/';
        const profileImg = props.user.userType === 'vet'? null : userData.profile_img;
        profileImgPath = profileImg === null ? rootPath + 'profile.png' : `${rootPath}${props.user.username}/${profileImg}`;
    }

    return (
        <React.Fragment>
            {
                props.logged &&

                <Grid
                    container
                    wrap={"nowrap"}
                    justify={'center'}
                    alignContent={'center'}
                    style={{
                        height: '100%',
                    }}
                >

                    <Paper
                        style={{
                            margin: '2em',
                            width: '90%',
                        }}
                    >

                        <Grid
                            container
                            justify={'center'}
                            alignContent={'center'}
                            direction={'column'}
                            wrap={'nowrap'}
                            style={{
                                padding: '1em',
                            }}
                        >

                            <LazyImage
                                src={profileImgPath}
                                alt={'profile image'}
                                containerHeight={'200px'}
                                avatar
                            />

                            <Typography
                                variant={"h4"}
                                align={"center"}
                            >
                                {props.user.username}
                            </Typography>

                            {props.user.userType === 'owner' &&

                            <OwnerPetList
                                user={props.user}
                            />

                            }

                            {
                                props.user.userType === 'vet'

                                &&

                                <VetAppoinmentList/>

                            }

                        </Grid>

                    </Paper>

                </Grid>
            }

            {!props.logged && <Redirect to={'/login'}/>}
        </React.Fragment>
    )
}

export default Profile;