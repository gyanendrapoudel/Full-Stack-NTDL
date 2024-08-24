import express from 'express';
import taskRouter from './src/routers/taskRouter.js'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path';

import { connectionMongoose } from './src/config/dbConfig.js';
const __dirname = path.resolve()

const app = express()
const PORT = 8000

app.use(morgan("combined"))
app.use(cors())

// static severing static folder
app.use(express.static(path.join(__dirname,"dist")))

app.use(express.json())
connectionMongoose()
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"dist","index.html"))
})
app.use('/api/v1/taskLists', taskRouter)


app.listen(PORT, (error)=>{
    error?console.log(error):console.log('PORT is listening on ',PORT)
})