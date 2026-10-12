"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// import Anthropic from "@anthropic-ai/sdk";
// // const anthropic = new Anthropic();
// const anthropic = new Anthropic({
//   // defaults to process.env["ANTHROPIC_API_KEY"]
//   apiKey: "ANTHROPIC_API_KEY",
// });
// async function main(){
//     const msg = await anthropic.messages.create({
//     model: "claude-sonnet-4-20250514",
//     max_tokens: 20000,
//     temperature: 1,
//     messages: [{
//         role:"user",
//         content:"what is 2+2"
//     }]
//     });
//     console.log(msg);
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const express_1 = __importDefault(require("express"));
const prompts_1 = require("./prompts");
const react_1 = require("./defaults/react");
const node_1 = require("./defaults/node");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const prompt = req.body.prompt;
    const response = yield groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
            {
                role: "system",
                content: "Retrun either react or node what do you think this project should be only return sinle word either rect or node. do not return anything extra",
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
    console.log(response.choices[0].message.content);
    //   const answer = (response.choices[0] as unknown as TextBlock).text;
    //   const answer = response.choices[0].message.content.trim().toLowerCase();
    const message = (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
    const answer = message === null || message === void 0 ? void 0 : message.trim().toLowerCase();
    if (answer == "react") {
        res.json({
            prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    else if (answer == "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
        return;
    }
    else {
        res.status(403).json({ message: "You can not access this" });
        return;
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    const response = yield groq.chat.completions.create({
        messages: [
            // {
            //   role:"user",
            //   content:[messages]
            // },
            ...messages,
            {
                role: "system",
                content: (0, prompts_1.getSystemPrompt)(),
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
    console.log(response.choices[0].message.content);
    console.log(response);
    res.json({});
}));
app.listen(3000);
// const groq = new Groq();
// export async function main() {
//   const stream = await getGroqChatStream();
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   }
// }
// export async function getGroqChatStream() {
//   return groq.chat.completions.create({
//     messages: [
//           {
//         role: "system",
//         content:getSystemPrompt(),
//       },
//       {
//         role: "user",
//         content: "Below is the conversation history, including all previous messages along with the most recent assistant response",
//       },
//     ],
//     // The language model which will generate the completion.
//     model: "llama-3.3-70b-versatile",
//     // Controls randomness: lowering results in less random completions.
//     // As the temperature approaches zero, the model will become deterministic
//     // and repetitive.
//     temperature: 0.5,
//     // The maximum number of tokens to generate. Requests can use up to
//     // 2048 tokens shared between prompt and completion.
//     max_completion_tokens: 1024,
//     // Controls diversity via nucleus sampling: 0.5 means half of all
//     // likelihood-weighted options are considered.
//     top_p: 1,
//     // A stop sequence is a predefined or user-specified text string that
//     // signals an AI to stop generating content, ensuring its responses
//     // remain focused and concise. Examples include punctuation marks and
//     // markers like "[end]".
//     stop: null,
//     // If set, partial message deltas will be sent.
//     stream: true,
//   });
// }
// main();
// async function main() {
//   const completion = await groq.chat.completions
//     .create({
//       messages: [
//         {
//           role: "user",
//           content: "write the code for todo application in react js",
//         },
//       ],
//       model: "llama-3.3-70b-versatile",
//     })
//   console.log(completion.choices[0].message.content);
// }
// main();
