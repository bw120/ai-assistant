import {defineChatSessionFunction} from "node-llama-cpp";

const controlPorchLights = defineChatSessionFunction({
    description: "Controls the state of the front porch lights. Calling this function will set the state of the lights and return the requested state and the current actual state.",
    params: {
        type: "object",
        properties: {
            lightOn: {
                type: "boolean"
            }
        }
    },
    handler: async (params) => {
        const {lightOn} = params;
        console.log("lightOn", lightOn);

        return {lightOn};
    }
});

export default controlPorchLights;
