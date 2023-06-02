const { DynamoDB } = require("aws-sdk");

const getTasks = async (event) => {
  const db = new DynamoDB.DocumentClient();

  const { Items: tasks } = await db
    .scan({
      TableName: "tasksTable",
    })
    .promise();

  return {
    status: 200,
    body: tasks,
  };
};

module.exports = { getTasks };
