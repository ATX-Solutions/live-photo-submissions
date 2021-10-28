import { ResponseError } from './dev';

interface AppConstants {
    messages: {
        sseConnectSuccess: string;
        sseConnectFailure: string;
        sseDisconnect: string;
        copiedToClipboard: string;
        serverError: string;
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
        sseConnectSuccess: 'Succesfully connected to the stream! 🎉',
        sseDisconnect: 'Succesfully disconnected from the stream! 🎉',
        sseConnectFailure: 'Oops! Something happened. 😢',
        copiedToClipboard: 'Image source was copied to clipboard! 📋',
        serverError: 'Oops! Something happened. 😢',
    },
    defaultValues: {
        sseError: { data: null, errors: { message: 'Oops! Something happened. 😢' } },
    },
    notifications: {
        autoHideDuration: 1500,
    },
};

export default APP_CONSTANTS;
