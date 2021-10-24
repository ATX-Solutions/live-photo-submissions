interface Response {
    status: number;
    data?: any;
    error?: any;
}

// interface ResponseSuccess extends Response {

// }

// interface ResponseError extends Response {

// }

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
