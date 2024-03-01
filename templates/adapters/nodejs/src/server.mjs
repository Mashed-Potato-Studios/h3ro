import { createServer } from 'http:node'
import { toNodeListener } from "h3"
import { app } from "./app.mjs"


createServer(toNodeListener(app)).listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
