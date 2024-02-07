import express, { response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';
// import shortid from 'shortid';

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/', Router)



const PORT =process.env.MY_PORT;
 app.listen(PORT,()=>console.log(`server is running on ${PORT}`))
 const USERNAME =process.env.DB_USERNAME;
 const PASSWORD =process.env.DB_PASSWORD;

 Connection(USERNAME, PASSWORD);