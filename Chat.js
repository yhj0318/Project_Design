const express = require('express');
const OpenAI = require('openai');
const app = express();
app.use(express.json());
require('dotenv').config();

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

/*app.get('/api/chat', async (req, res) => {
    try {
        // 어시스턴트 정보 검색
        const myAssistant = await openai.beta.assistants.retrieve(
            "asst_XsURbgrOTNx2EsK359nWIr8j"
        );
        console.log(myAssistant.id);

        // 클라이언트에 결과 반환
        res.json({
            assistantId: myAssistant.id,
        });
    } catch (error) {
        console.error('Error during API request:', error);
        res.status(500).send('Internal Server Error');
    }
});*/

async function main() {
    try {
        // 스레드 생성 및 실행
        // 스레드 메세지 직접 입력부분을 클라이언트에서 텍스트 입력으로 변경해야함
        const creationRun = await openai.beta.threads.createAndRun({
            assistant_id: "asst_XsURbgrOTNx2EsK359nWIr8j",
            thread: {
                messages: [
                    { role: "user", content: "안녕" }
                ],
            }
        });
        console.log(creationRun);

      // 스레드 생성과 실행으로 부터 생성되는 스레드 id , run id 값을 메세지 리스트 출력 부분에 바로 적용해야함
     // 메세지 리스트
        const threadMessages = await openai.beta.threads.messages.list(
            "thread_mmaxBfwNGnJMddCKwaSbjiE1"
          );
          if (threadMessages && threadMessages.data && threadMessages.data.length > 0) {
            threadMessages.data.forEach((message, index) => {
                console.log(`Message ${index + 1}:`);
                console.log(`Role: ${message.role}`); // 메시지를 보낸 역할
                if (typeof message.content === 'object') {
                    console.log(`Content: ${JSON.stringify(message.content)}`); 
                } else {
                    console.log(`Content: ${message.content}`);
                }
                console.log(`Created At: ${new Date(message.created_at * 1000).toLocaleString()}`); 
                console.log('-----------------------------------');
            });
        } else {
            console.log('No messages found in the thread.');
        }




    } catch (error) {
        console.error('Error during API request in main:', error);
    }
}

main(); // 함수 실행

app.listen(3000, () => {
    console.log('Server started on port 3000');
});