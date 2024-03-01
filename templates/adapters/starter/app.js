"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h3_1 = require("h3");
var node_http_1 = require("node:http");
var app = (0, h3_1.createApp)();
app.use((0, h3_1.eventHandler)(function (event) {
    console.log(event);
    return "Hello World!";
}));
(0, node_http_1.createServer)((0, h3_1.toNodeListener)(app)).listen(3000);
