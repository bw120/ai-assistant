import {fileURLToPath} from "url";
import path from "path";
import chalk from "chalk";
import {
    getLlama,
    LlamaChatSession,
    resolveModelFile,
    Llama3_2LightweightChatWrapper
} from "node-llama-cpp";
import * as integrations from "./integrations/index.js";

const MODEL = "Llama-3.2-3B-Instruct.Q4_K_M.gguf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDirectory = path.join(__dirname, "..", "models");

const llama = await getLlama();

console.log(chalk.yellow("Resolving model file..."));
const modelPath = await resolveModelFile(MODEL, modelsDirectory);

console.log(chalk.yellow("Loading model..."));
const model = await llama.loadModel({modelPath});

console.log(chalk.yellow("Creating context..."));
const context = await model.createContext({
    threads: 2,
    contextSize: 3000
});

const session = new LlamaChatSession({
    contextSequence: context.getSequence(),
    chatWrapper: new Llama3_2LightweightChatWrapper(),
    systemPrompt: `You are an assistant that is direct to the point but also helpful. 
    
    You have many functions that you can use to help the user. Some will provide you with the information you need to answer the user's question. Others give you control of devices.
    
    Each function will return information or the state of the devices that were controlled. Use the information returned to you to respond to the user.
    `
});

const ChatAgent = {
    prompt: async ({question, onTextChunk}: {question: string, onTextChunk?: (chunk: string) => void}) => {
        await session.prompt(question, {
            functions: {...integrations},
            onTextChunk(chunk = "") {
                if (onTextChunk) {
                    onTextChunk(chunk);
                }
            }
        });
    }
};


export default ChatAgent;
