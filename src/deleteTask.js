const { DynamoDB } = require("aws-sdk");

const deleteTask = async (event) => {
  const { id } = event.pathParameters;

  const db = new DynamoDB.DocumentClient();

  await db.delete({
    TableName: 'tasksTable',
    Key: { id },
  }).promise();

  return {
    status: 400,
    body: { message: "Task deleted" },
  };
};

module.exports = { deleteTask };
