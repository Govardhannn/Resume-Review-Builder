import { GoogleGenAI } from "@google/genai";
const trandingjob = async () => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Return only a raw JSON object. 
        Do not use markdown.
        Do not use backticks.
        Do not add explanations or extra text.
       Generate 5 real high-demand job roles and place them in this format:
        {
          "jobs": string[]
        }
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })
        if (!response) {
            return null;
        }
        const result = response.candidates[0].content.parts[0].text;
        const cleanText = result.replace(/^\s*```[a-z]*\s*\n|\n```\s*$/gi, '').trim();
        const finalResult = JSON.parse(cleanText);
        return finalResult;
    }
    catch (error) {
        console.log("gemini error", error);
        return null;
    }
}

export default trandingjob