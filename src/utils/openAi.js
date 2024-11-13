import OpenAI from 'openai';
import { openAikey, geminiapikey} from './constants';
// const openAi = new OpenAI({
//   apiKey: openAikey, 
//   dangerouslyAllowBrowser: true
// });
// export default openAi;
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(geminiapikey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",dangerouslyAllowBrowser: true });
export default model;


