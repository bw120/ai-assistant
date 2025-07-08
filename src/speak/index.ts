// TODO: setup speech synthesizer to output AI response

// import * as Echogarden from "echogarden";
// import play from "audio-play";
// // import load from "audio-loader";
// import decodeAudio from "audio-decode";
// import Speaker from "speaker";

// const speaker = new Speaker({
//     channels: 1,
//     bitDepth: 16,
//     sampleRate: 22050,
//     endianness: "LE"
// });


// const onSegment = async (data) => {
//     // console.log("audioBuffer", data.audio);
//     // await speaker.write(data.audio);

//     const audioBuffer = await decodeAudio(data.audio);
//     await play(audioBuffer, {});
// };

// const Speak = async (text: string) => {
//     // const voices = await Echogarden.requestVoiceList({language: "en-US", engine: "espeak"});
//     // console.log("vlices", voices);
//     await Echogarden.synthesize(
//         text,
//         {language: "en-US", pitchVariation: 5, segmentEndPause: 0, name: "gmw/en-US", engine: "espeak", outputAudioFormat: {codec: "wav"}},
//         onSegment
//     );
// };

// export default Speak;
