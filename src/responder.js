import {
  LlamaGrammar,
  LlamaModel, LlamaContext, LlamaChatSession
} from "node-llama-cpp";
import { compile, serializeGrammar } from "@intrinsicai/gbnfgen";

import MyCustomChatPromptWrapper from './chatWrapper.js'

const llamaPath = "./models/Phi-3.1-mini-4k-instruct-Q4_K_M.gguf";

const model = new LlamaModel({
  modelPath: llamaPath
})

const prompt = `
Given the user request and the available functions listed below, determine which function should be called. 
In addition to the function, determine parameters and their values. You need to provide the details of the function name, parameters and their values.
You are to provide the parameters relevant to the function you determined to be the appropriate one.

Below are the available functions with a description and available parameters. The parameters listed for each function are the only ones valid for that function:

weather
  * Function Name: 'weather'
  * Function Description: current weather conditions for a location.
  * parameters: 
    - city
    - state
    - country

porch_lights
  * Function Name: 'porch_lights'
  * Function description: controls the front porch lights. 
  * parameters: 
    - state (on or off)
  
other 
  * Function Name: 'other'
  * description: all requests that do not fit into the above functions.
  * parameters: 
    - target (the item the user wants)
    - state

You must respond only in the JSON format. Do not provide any other comment or response other than the properties in the JSON.
The JSON should be returned in the following format:
{ functionName: <Function Name>, parameters: {name: <parameter name>, value: <parameter value>}}

Only return parameters that are listed for the function that you determine . For example, the 'city' parameter is expected for the 'weather' function but should not be returned for 'porch_lights'.
`;

const compiledJsonGrammar = await compile(`interface Intent {
  parameters: FunctionParameters[];
  functionName: string;
}

interface FunctionParameters {
  name: string;
  value: string;
}`, 'Intent');

const grammar = new LlamaGrammar({
  grammar: serializeGrammar(compiledJsonGrammar)
});

const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context,
  systemPrompt: prompt,
  promptWrapper: new MyCustomChatPromptWrapper()
 });

const processUserRequest = async (question) => await session.prompt(question, {
    grammar,
    temperature: 0,
    threads: 24,
    gpuLayers: 99,
    trimWhitespaceSuffix: true,
    maxTokens: context.getContextSize()
  });

  export default processUserRequest;
