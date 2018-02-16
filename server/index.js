'use strict';

const Hapi = require('hapi');
const joi = require('joi');
const env = process.env.NODE_ENV || 'development';

let settings;
try {
    settings = require(`./settings/${env}`);
} catch (err) {
    throw new Error(err);
}

try {
    process.env.DB = settings.database;
} catch (err) {
    throw new Error(err);
}

const server = new Hapi.Server(settings.http);

/**
 * Users routes
 */
server.route(require('./routes/users/getUsers'));
server.route(require('./routes/users/getUserById'));
server.route(require('./routes/users/createUser'));
server.route(require('./routes/users/deleteUser'));
server.route(require('./routes/users/updateUser'));
server.route(require('./routes/posts/getPostById'));
server.route(require('./routes/posts/deletePost'));


async function start() {
    
    await server.register({
        plugin: require('./plugins/token'),
        options: {
            name : 'tot'
    }
    })
        try {
            await server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Server running at:', server.info.uri);
};

start();
