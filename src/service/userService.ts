import { DocumentClient } from "aws-sdk/clients/dynamodb"
import User from "src/models/UserInterface";

export default class UserService {

    private Tablename: string = 'UsersTable';

    constructor(private docClient: DocumentClient) { }

    async getAllUsers(): Promise<User[]> {
        const users = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return users.Items as User[];
    }

    async createUser(user: User): Promise<User> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: user
        }).promise()
        return user as User;

    }


    async updateUser(id: string, user: Partial<User>): Promise<User> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { usersId: id },
                UpdateExpression: "set #name = :nameValue, #family = :familyValue",
                ExpressionAttributeNames: {
                    "#name": "name",
                    "#family": "family",
                    
                },
                ExpressionAttributeValues: {
                    "#name": user.name,
                    "#family": user.family,
                   
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as User;
    }

    async deleteUser(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                usersId: id
            }
        }).promise()

    }

}