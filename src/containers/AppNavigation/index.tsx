import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { setInterceptor } from '../../utils/axios';

import styles from './AppNavigation.module.scss';

const AppNavigation = () => {
    const history = useHistory();
    useEffect(() => {
        setInterceptor(history);
    }, []);
    return (
        <AppBar position='static' className={styles.wrapper}>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <NavLink to={'/'}>Photos</NavLink>
                </Typography>
                <Button color='inherit' component={NavLink} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={NavLink} to='/archive'>
                    Archive
                </Button>
                <Button color='inherit' component={NavLink} to='/about'>
                    About
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavigation;
