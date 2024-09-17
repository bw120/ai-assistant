import { ChatPromptWrapper} from "node-llama-cpp";

class MyCustomChatPromptWrapper extends ChatPromptWrapper {
    wrapperName = "MyCustomChat";
    
   wrapPrompt(prompt, {systemPrompt, promptIndex}) {
        if (promptIndex === 0) {
            return "<|system|> " + systemPrompt + "<|end|>\n<|user|>" + prompt + "\n<|assistant|>";
        } else {
            return "\n<|user|>" + prompt + "<|end|>\n<|assistant|>";
        }
    }

    getStopStrings() {
        return ["<|end|>"];
    }

    getDefaultStopString() {
        return "<|end|>";
    }
}

export default MyCustomChatPromptWrapper;