const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express();
server.use(cors());
server.use(bodyParser.json());

const user = require('./router/user.router');
const category = require('./router/category.router');
const product = require('./router/product.router');
const order = require('./router/order.router');
const test = require('./router/test.router');
server.use("/api/test", test);


server.use("/api/user", user);
server.use("/api/category", category);
server.use("/api/product", product);
server.use("/api/order", order);


// server.use("/api/attendance", attendance);
// server.use("/api/teacher", teacher);
// server.use("/api/class", classes);




module.exports = server;