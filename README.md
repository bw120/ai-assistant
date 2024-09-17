# Using AI to convert call functions

## Installation
1. Run `npm install`
2. Download a LLM model in the gguf format. The repo is setup for using Phi-3.1-mini-4k-instruct-Q4_K_M.gguf. This can be downloaded from huggingface.co. You can try using others.
If you do, you need to update the `llamaPath` in the `responsder.js` file. You may also need to update the chatWrapper.js to fit the prompt format for the chose LLM. This is usually referenced in the description on Huggingface.
3. start terminal script by running `npm start`
4. When the script finishes loading, it will have a prompt from the AI. Type in a question or request for the chatbot. It will respond in JSON with the appropriate function name and paramters.