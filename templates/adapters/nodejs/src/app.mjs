import { createApp, defineEventHandler, H3Event } from 'h3'

const app = createApp()

app.use(defineEventHandler(async (event: H3Event) => {
    console.log('event', event)
    return {
        statusCode: 200,
        body: 'Hello, World!'
    }
}))