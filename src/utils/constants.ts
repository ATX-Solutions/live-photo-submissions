import { ResponseError } from './dev';

interface AppConstants {
    messages: {
        sseConnectSuccess: string;
        sseConnectFailure: string;
    };
    defaultValues: {
        sseError: ResponseError;
    };
    notifications: {
        autoHideDuration: number;
    };
}

const APP_CONSTANTS: AppConstants = {
    messages: {
        sseConnectSuccess: 'Succesfully connected to the stream!',
        sseConnectFailure: 'Oops! Something happened',
    },
    defaultValues: {
        sseError: { data: null, errors: { message: 'Oops! Something happened' } },
    },
    notifications: {
        autoHideDuration: 1500,
    },
};

export default APP_CONSTANTS;
