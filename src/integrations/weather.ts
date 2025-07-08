import {defineChatSessionFunction} from "node-llama-cpp";

const getWeather = defineChatSessionFunction({
    description: "Returns the weather for a requested city. Use the returned information to generate your response.",
    params: {
        type: "object",
        properties: {
            city: {
                type: "string"
            },
            state: {
                type: "string"
            },
            country: {
                type: "string"
            }
        }
    },
    handler: async (params) => {
        console.log("weather params", params);

        // mock up the details until an API can be integrated
        const details = {
            temperature: `${Math.floor(Math.random() * (106 - 12 + 1) + 12)} degrees Fahrenheit`,
            precipitation: `${Math.floor(Math.random() * 100)}%`,
            description: "Cloudy with occasional rain."
        };
        console.log("details", details);
        return details;
    }
});

export default getWeather;
