import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import axiosInstance, { setInterceptor } from '../../utils/axios';

import styles from './AppNavigation.module.scss';

const AppNavigation = () => {
    const history = useHistory();

    useEffect(() => {
        setInterceptor(history);
    }, []);

    const simulateServerError = async () => {
        try {
            await axiosInstance.get('/randomString');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AppBar position='static' className={styles.wrapper}>
            <Toolbar>
                <Typography variant='h6' component='div' className={styles.appTitle}>
                    <NavLink to={'/'}>Photos</NavLink>
                </Typography>
                <Button color='inherit' component={NavLink} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={NavLink} to='/archive'>
                    Archive
                </Button>
                <Button color='error' onClick={simulateServerError}>
                    Server Error
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavigation;
