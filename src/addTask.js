const { v4: uuid } = require("uuid");
const { DynamoDB } = require("aws-sdk");

const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");


const addTask = async (event) => {
  // Create DB
  const dynamoDB = new DynamoDB.DocumentClient();

  const { title, description } = event.body;
  const date = new Date().toISOString();
  const id = uuid();

  const newTask = { id, title, description, createdAt: date };

  await dynamoDB
    .put({
      TableName: "tasksTable",
      Item: newTask,
    })
    .promise();

  return {
    status: 201,
    body: newTask
  };
};

module.exports = { addTask: middy(addTask).use(jsonBodyParser()) };
