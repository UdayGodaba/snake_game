import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Selection from '../../components/Selection';
import ScoreBoard from "../../components/ScoreBoard";


const HomePage = () => {


    return (
        <Grid container sx={{ height: "93vh" }}>
            <Grid item xs={8} sx={{ backgroundColor: "#fff0ff" }}>
                <Selection />
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: "#d9c9cf" }}>
                <ScoreBoard />
            </Grid>
        </Grid>

    )
};

export default HomePage;