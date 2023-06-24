import type { AWS } from '@serverless/typescript';
import { getAllUsers, createUser, updateUser, deleteUser } from '@functions/user'


const serverlessConfiguration: AWS = {
  service: 'aws-nodejs',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild',],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
  
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
     
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:table/UsersTable",
        }],
      },

    },
  },
  // import the function via paths
  functions: { getAllUsers, createUser, updateUser, deleteUser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      UsersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UsersTable",
          AttributeDefinitions: [{
            AttributeName: "usersId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "usersId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
