import chalk from "chalk";
import ChatAgent from "./chatAgent.js";

const AI_TAG = chalk.green("\nAI Bot: ");
const USER_TAG = chalk.yellow("\nMe: ");

const processUserRequest = async (question: string) => {
    await ChatAgent.prompt({question,
        onTextChunk: (chunk) => {
            // Speak(chunk);
            // stream the response to the console as it's being generated
            process.stdout.write(chunk);
        }
    });
};

const respondToUserRequests = () => {
    process.stdin.on("data", async (data) => {
        const userInput = data.toString().toUpperCase();
        process.stdout.write("AI Bot: ");
        await processUserRequest(userInput);
        await process.stdout.write(`\n${USER_TAG}`);
    });
};

const initialIntroQuestion = () =>
    process.stdout.write(
        `${AI_TAG} Hello! I am an AI Assistant. How can I help?\n${USER_TAG}`
    );

const initiateApp = () => {
    initialIntroQuestion();
    respondToUserRequests();
};

initiateApp();
