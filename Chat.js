const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

let threadId = null;
let isFirstMessage = true;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'login_test'
});

app.post('/login', async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await db.query('SELECT token FROM users WHERE id = ?', [id]);
        if (rows.length > 0 && rows[0].token) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error processing your request');
    }
});

app.post('/message', async (req, res) => {
    const userInput = req.body.message;
    const { id } = req.body;
    try {
        const [rows] = await db.query('SELECT token FROM users WHERE id = ?', [id]);
        if (rows.length > 0 && rows[0].token) {
            if (isFirstMessage) {
                const creationRun = await openai.beta.threads.createAndRun({
                    assistant_id: "asst_XsURbgrOTNx2EsK359nWIr8j",
                    thread: {
                        messages: [
                            { role: "user", content: userInput }
                        ],
                    }
                });
                threadId = creationRun.thread_id;
                isFirstMessage = false;
                res.json({ messages: creationRun });
            } else {
                await openai.beta.threads.messages.create(threadId, {
                    role: "user",
                    content: userInput
                });
                await openai.beta.threads.runs.create(threadId, {
                    assistant_id: "asst_XsURbgrOTNx2EsK359nWIr8j"
                });
                const messages = await openai.beta.threads.messages.list(threadId);
                res.json({ messages: messages });
            }
        } else {
            res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
        }
    } catch (error) {
        console.error('Error during API request:', error);
        res.status(500).send('Error processing your request');
    }
});

app.get('/messages', async (req, res) => {
    try {
        if (threadId) {
            const messages = await openai.beta.threads.messages.list(threadId);
            res.json(messages);
        } else {
            res.status(404).send("No thread started");
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
});