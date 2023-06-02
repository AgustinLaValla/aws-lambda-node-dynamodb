const { v4: uuid } = require("uuid");
const { DynamoDB } = require("aws-sdk");

const addTask = async (event) => {
  // Create DB
  const dynamoDB = new DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);
  const date = new Date().toISOString();
  const id = uuid();

  const newTask = { id, title, description, createdAt: date };

  await dynamoDB
    .put({
      TableName: "tasksTable",
      Item: { id, title, description, createdAt: date },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newTask),
  };
};

module.exports = { addTask };
