const { app } = require('@azure/functions');
const { TableClient } = require("@azure/data-tables");

app.storageQueue('QueueTriggerFunction', {
    queueName: 'messages',
    connection: 'AzureWebJobsStorage',

    handler: async (message, context) => {

        const data = typeof message === "string"
            ? JSON.parse(message)
            : message;

        const tableClient = TableClient.fromConnectionString(
            "UseDevelopmentStorage=true",
            "messagesTable"
        );

        await tableClient.createTable();

        const entity = {
            partitionKey: "messages",
            rowKey: Date.now().toString(),
            name: data.name,
            timestamp: data.timestamp
        };

        await tableClient.createEntity(entity);

        context.log("Message écrit dans Table Storage");
    }
});