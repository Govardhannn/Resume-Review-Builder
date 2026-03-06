import { GoogleGenAI } from "@google/genai"

const resumeResponse = async (resumeText, jobDescription) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Compare the following resume with the job description. 
    - Give a match score (0-100). 
    - List missing keywords/skills. 
    - Provide 2-3 suggestions in one sentence and don't add any special keyword just english letter. 
    
    Resume: ${resumeText} 
    Job Description: ${jobDescription} 
    
    Please format your response as a JSON object with the following keys: 
    { 
      "matchScore": number, 
      "missingSkills": string[], 
      "suggestions": string 
    }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            responseMimeType: "application/json"
        })
        if (!response) {
            console.log("response is not getting from gemini");
            return;
        }
        const result = response.candidates[0].content.parts[0].text;
        const cleanText = result.replace(/^\s*```[a-z]*\s*\n|\n```\s*$/gi, '').trim();
        const finalResult = JSON.parse(cleanText);
        return {
            score: finalResult.matchScore, 
            missingSkill: finalResult.missingSkills,
            suggestions: finalResult.suggestions
        };
    }
    catch (error) {
        console.log("gemini error", error);
        return;
    }
}

export default resumeResponse;

