import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const AppNavigation = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <NavLink to={'/'}>Photos</NavLink>
                </Typography>
                {/* <NavigationLink to={'/'} label={'Home'} /> */}
                <Button color='inherit' component={NavLink} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={NavLink} to='/about'>
                    About
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavigation;
