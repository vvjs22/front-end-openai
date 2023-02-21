import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config({path:`./my-app/.env`});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async (req, res) => {

  if(!configuration.apiKey) {
    res.status(500).json({error: 'No API key found'});
    return;
  }

  const { firstName, lastName } = req.body;
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Topic: Breakfast\nTwo-Sentence Horror Story: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Wind\nTwo-Sentence Horror Story:",
  temperature: 0.8,
  max_tokens: 100,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
});
res.status(200).json({result: response.data.text});
}