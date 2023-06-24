import dynamoDBClient from "src/models";
import UserService from "./userService";


const userService = new UserService(dynamoDBClient())
export default userService;