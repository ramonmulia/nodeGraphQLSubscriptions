const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { subscribe, execute } = require('graphql');
const db = require('./db');

const schema = require('./schema');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
    context: {
        db
    },
    schema
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const server = createServer(app);

server.listen(PORT, err => {
    if (err) {
        console.error(err);
        throw err;
    }

    new SubscriptionServer({
        schema,
        execute,
        subscribe,
        onConnect: () => console.log('Client connected!')
    }, {
            server,
            path: '/subscriptions'
        });

    console.log(`Listen: ${PORT}`);
});
