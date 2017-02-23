import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

let MONGO_URL="mongodb://rgrpoc:rgrpoc@ds055555.mlab.com:55555/rgr-poc";

let app = express();

app.use(express.static('public'));

let db;

MongoClient.connect(MONGO_URL, (err, database) => {
    if (err) throw err;

    db = database;

    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }))

    app.listen(3000, () => console.log('Listening on port 3000'));

});