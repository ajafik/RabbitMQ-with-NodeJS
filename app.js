let server = require('./server');
const api_version = '/v1';

server.use(api_version, require('./routes/main'));

server.listen(4000, function () {
    console.log(`${server.name} listening at 4000`);
});