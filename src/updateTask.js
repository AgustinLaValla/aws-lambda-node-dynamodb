const { DynamoDB } = require("aws-sdk");

const updateTask = async (event) => {
  const { id } = event.pathParameters;
  const { done, title, description } = JSON.parse(event.body);

  const db = new DynamoDB.DocumentClient();

  await db
    .update({
      TableName: "tasksTable",
      Key: { id },
      UpdateExpression: "set done = :done, title = :title, description = :description",
      ExpressionAttributeValues: {
        ":done": done,
        ":title": title,
        ":description": description
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: { message: "Task uploaded" },
  };
};

module.exports = { updateTask };
