
import { handlerPath } from "@libs/handler-resolver";

export const getAllUsers = {
    handler: `${handlerPath(__dirname)}/handler.getAllUsers`,
    events: [
        {
            http: {
                method: 'get',
                path: 'users',
                cors: true
            },
        },
    ]
};
export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user',
                cors: true
            },
        },
    ],
};


export const updateUser = {
    handler: `${handlerPath(__dirname)}/handler.updateUser`,
    events: [
        {
            http: {
                method: 'put',
                path: 'user/{id}',
                cors: true
            },
        },
    ],
};

export const deleteUser = {
    handler: `${handlerPath(__dirname)}/handler.deleteUser`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'user/{id}',
                cors: true
            },
        },
    ],
};