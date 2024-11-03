import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './Routes/route.js'

import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Use your router
app.use('/', Router);

const Port = 5000;

app.listen(Port,()=>{console.log(`server is running on Port : ${Port}`)});

const URL = process.env.DB_URL;

Connection(URL);  