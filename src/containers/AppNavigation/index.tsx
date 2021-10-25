import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { setInterceptor } from '../../utils/axios';

const AppNavigation = () => {
    const history = useHistory();
    useEffect(() => {
        setInterceptor(history);
    }, []);
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
