const { app } = require('@azure/functions');
const { QueueClient } = require("@azure/storage-queue");

app.http('HttpTriggerFunction', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',

    handler: async (request, context) => {

        const name = request.query.get('name')
            || await request.text()
            || 'world';

        const queueClient = new QueueClient(
            "UseDevelopmentStorage=true",
            "messages"
        );

        await queueClient.createIfNotExists();
        context.log("Queue exists or created");

        const message = {
            name,
            timestamp: new Date().toISOString()
        };

        await queueClient.sendMessage(
            Buffer.from(JSON.stringify(message)).toString("base64")
        );

        context.log("Message envoyé dans la queue");

        return {
            body: "OK - message envoyé"
        };
    }
});