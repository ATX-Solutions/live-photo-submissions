import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './containers/App';

import { store } from './redux/store';
import { setToken } from './utils/axios';
import APP_CONSTANTS from './utils/constants';

import './index.scss';

setToken(process.env.REACT_APP_API_TOKEN as string);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={5} autoHideDuration={APP_CONSTANTS.notifications.autoHideDuration}>
                <App />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
