import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { Box, Button } from '@mui/material';
import { setLogout } from '../store/auth';


const NavBar = () => {

  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#445069", height: "7vh"}}>
        <Toolbar>
          <Typography variant="h4" component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Snake-Game
          </Typography>
          {isAuth &&
            <Button color="inherit"
              sx={{
                fontFamily: 'monospace',
              }}
              onClick={() => {
                dispatch(setLogout())
              }}
            >
              LogOut
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar;