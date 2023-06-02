const { DynamoDB } = require("aws-sdk");

const getTask = async (event) => {
  const { id } = event.pathParameters;

  const db = new DynamoDB.DocumentClient();

  const { Item: task } = await db.get({
    TableName: "tasksTable",
    Key: {
      id,
    },
  }).promise();


  return {
    status: 200,
    task
  }
};

module.exports = { getTask };
