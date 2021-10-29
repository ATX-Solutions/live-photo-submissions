import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { LocalizationProvider } from '@mui/lab';

import App from './containers/App';

import { store } from './redux/store';
import { setToken } from './utils/axios';
import APP_CONSTANTS from './utils/constants';
import { SnackbarUtilsConfigurator } from './utils/snackbar';

import './index.scss';
import theme from './utils/theme';

setToken(process.env.REACT_APP_API_TOKEN as string);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <SnackbarProvider
                        maxSnack={5}
                        autoHideDuration={APP_CONSTANTS.notifications.autoHideDuration}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        hideIconVariant
                    >
                        <SnackbarUtilsConfigurator />
                        <App />
                    </SnackbarProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
