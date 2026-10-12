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
import Groq from "groq-sdk";
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const app = express();
app.use(express.json());


app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content:
          "Retrun either react or node what do you think this project should be only return sinle word either rect or node. do not return anything extra",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  console.log(response.choices[0].message.content);
//   const answer = (response.choices[0] as unknown as TextBlock).text;
//   const answer = response.choices[0].message.content.trim().toLowerCase();
const message = response.choices?.[0]?.message?.content;
const answer = message?.trim().toLowerCase();
  if (answer == "react") {
     res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        return;
  }
  else if (answer == "node") {
     res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return;
  }
  else{
    res.status(403).json({message : "You can not access this"});
    return;
  }
    
});
app.post("/chat", async (req, res)=>{
  const messages = req.body.messages;
  
  const response = await groq.chat.completions.create({
    messages:[
      // {
      //   role:"user",
      //   content:[messages]
      // },
      ...messages,
      {
        role: "system",
        content:getSystemPrompt(),
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  console.log(response.choices[0].message.content);
  console.log(response);
  res.json({});
})
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
