import { createApp, eventHandler, H3Event, toNodeListener } from "h3";
import { createServer } from "node:http";

const app = createApp();

app.use(eventHandler((event: H3Event) => {
    console.log(event);
    return "Hello World!";
}))

createServer(toNodeListener(app)).listen(3000);