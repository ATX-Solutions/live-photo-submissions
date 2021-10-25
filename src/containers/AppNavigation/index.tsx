import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const AppNavigation = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <NavLink to={'/'}>Photos</NavLink>
                </Typography>
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
