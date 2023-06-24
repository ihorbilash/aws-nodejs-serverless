
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import userService from "src/service";
import { v4 } from "uuid";
import { corsHeaders } from '@functions/cors';

const headers = {
    'Access-Control-Allow-Origin': 'http://44.201.74.140:8080/',
    'Access-Control-Allow-Credentials': true,
};

export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const users = await userService.getAllUsers();
    return formatJSONResponse({
        statusCode: 200,
        headers: { ...headers, ...corsHeaders },
        body: JSON.stringify({ users }),
    })
})


export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const id = v4();
        const createUser: { name: string, family: string } = JSON.parse(event.body)
        const user = await userService.createUser({
            usersId: id,
            name: createUser.name,
            family: createUser.family,
            createdTime: new Date().toISOString(),
        })
        return formatJSONResponse({
            statusCode: 200,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ user }),
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ status: 500, message: e })
        });
    }
})

export const updateUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.updateUser(id, JSON.parse(event.body))
        return formatJSONResponse({
            statusCode: 200,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ user, id }),
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ status: 500, message: e })
        });
    }
})

export const deleteUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.deleteUser(id)
        return formatJSONResponse({
            statusCode: 200,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ user, id })
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            headers: { ...headers, ...corsHeaders },
            body: JSON.stringify({ status: 500, message: e })
        });
    }
})

