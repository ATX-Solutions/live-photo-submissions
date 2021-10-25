interface APIError {
    message: string;
    meta?: {};
}
export interface Response {
    status?: number;
    data?: any;
    errors?: any;
}

export interface ResponseSuccess extends Response {
    errors: null;
    data: any;
}

export interface ResponseError extends Response {
    data: null;
    errors: APIError;
}

export const mockFetch = (success: boolean = true, response: Response, timeout = 500): Promise<Response> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(response);
            } else {
                reject(response);
            }
        }, timeout);
    });
};
