
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import userService from "src/service";
import cors from "@middy/http-cors"
import { v4 } from "uuid";


export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const users = await userService.getAllUsers();
    return formatJSONResponse({
        users
    })
}).use(cors())


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
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500, message: e
        });
    }
}).use(cors())

export const updateUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.updateUser(id, JSON.parse(event.body))
        return formatJSONResponse({

            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500, message: e
        });
    }
}).use(cors())

export const deleteUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.deleteUser(id)
        return formatJSONResponse({
            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500, message: e
        });
    }
}).use(cors())

