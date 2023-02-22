import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#1E1E1E',
});

const CustomToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const CustomTypography = styled(Typography)({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
});

const CustomButton = styled(Button)({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  marginLeft: '10px',
});

const NavBar = () => {
  return (
    <CustomAppBar position="static">
      <CustomToolbar>
        <CustomTypography variant="h6" component="div">
          My App
        </CustomTypography>
        <div>
          <CustomButton color="inherit">Home</CustomButton>
          <CustomButton color="inherit">About</CustomButton>
          <CustomButton color="inherit">Contact</CustomButton>
        </div>
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default NavBar;
