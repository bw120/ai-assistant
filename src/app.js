import processUserRequest from './responder.js';

const initialIntroQuestion = () => process.stdout.write("AI Bot: Hello! I am an AI Assistant. How can I help?\nME: ");

const respondToUserRequests = () => {
  process.stdin.on('data', async (data) => {
    const userInput = data.toString().toUpperCase()
    const response = await processUserRequest(userInput);

    await process.stdout.write(`\nAI Bot: ${response}\nMe: `);
  });
};

const initiateApp = () => {
  initialIntroQuestion();
  respondToUserRequests();
}

initiateApp();
