/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import { onCall } from "firebase-functions/v2/https";

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import "dotenv/config";
// import cors from "cors";

// import * as functions from "firebase-functions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateRecipe = onRequest({cors: true}, async (req, res) => {
  const prompt = req.body.prompt;
  console.log("prompt: ", prompt);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(`${content}`);
      console.log(content);
    }

    res.end();
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({error: "Failed to generate recipe"});
  }
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
