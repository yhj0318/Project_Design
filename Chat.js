const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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


app.post('/message', async (req, res) => {
    const userInput = req.body.message;
    try {
        if (isFirstMessage) {
            // 새로운 쓰레드 생성과 동시에 런
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
            // 기존 쓰레드에 메시지 추가
            await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: userInput
            });
            // 쓰레드 실행
            await openai.beta.threads.runs.create(threadId, {
                assistant_id: "asst_XsURbgrOTNx2EsK359nWIr8j"
            });
            // 메시지 목록 가져오기
            const messages = await openai.beta.threads.messages.list(threadId);
            res.json({ messages: messages });
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


app.listen(3000, () => {
    console.log('Server started on port 3000');
});