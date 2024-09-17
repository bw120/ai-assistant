import {
  LlamaGrammar,
  LlamaModel, LlamaContext, LlamaChatSession
} from "node-llama-cpp";
import { compile, serializeGrammar } from "@intrinsicai/gbnfgen";

import play from 'audio-play';
import decodeAudio from 'audio-decode';

import * as Echogarden from 'echogarden';

const llamaPath = "./models/mistral-7b-openorca.Q4_0.gguf";
const question = "Where do Llamas come from?";


const model = new LlamaModel({
  modelPath: llamaPath
})


const prompt = `Given the user request below, determine what context it relates. In addtion to the context, determine pertinent parameters. Below are the available context categories with a description and available parameters:

weather
  * description: current weather conditions for a location.
  * parameters: city, state

porch_lights
  * description: controls the front porch lights. 
  * parameters: state (on or off)
  
other 
  * description: all contexts that do not fit into the abobe.
  * parameters: none

Respond with only JSON in the following format:
{{ name: <context name>, parameters: {{name: <parameter name>, value: <paramter value>}}}}

<request>
What is the weather in Boston, MA?
</request>

Context:`;


// const compiledJsonGrammar = await compile(`interface Intent {
//   parameters: Lights | Weather;
//   context: string;
// }

// interface Lights {
//   state: boolean
// }

// interface Weather {
//   state: string;
//   city: string
// }`, 'Intent');

// console.log('compiledJsonGrammar', compiledJsonGrammar)
// const grammar = new LlamaGrammar({
//   grammar: serializeGrammar(compiledJsonGrammar)
// });
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });


const q1 = 'How are you doing?';
console.log("User: " + q1);

const onSegment = async (data) => {
  console.log('SEGMENT', data)
  const audioBuffer = await decodeAudio(data.audio);
  play(audioBuffer, {});
}

const speak = async (text) => {
  const voice = await Echogarden.synthesize(
    text,
    { language: 'en-US', engine: 'vits', voice: 'hfc_female', outputAudioFormat: { codec: 'wav' } },
    onSegment,
  )
}

const a1 = await session.prompt(question, {
  // grammar,
  // temperature: .5,
  // topK: 0,
  // topP: 0,
  // trimWhitespaceSuffix: true,
  // maxTokens: context.getContextSize()
});

speak(a1)



