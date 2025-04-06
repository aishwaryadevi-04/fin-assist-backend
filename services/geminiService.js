const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getStockSymbol(companyName) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Given the company name "${companyName}", return only its stock ticker symbol (e.g., Microsoft -> MSFT, Apple -> AAPL, Infosys -> INFY). Do not provide any explanations or code. If the company is not found, return "UNKNOWN".`
                            }
                        ]
                    }
                ]
            }
        );

        const geminiResponse = response.data.candidates[0].content.parts[0].text.trim();
        return geminiResponse !== "UNKNOWN" ? geminiResponse : null;
    } catch (error) {
        console.error("Error with Gemini API:", error);
        return null;
    }
}
async function getRelevantKeywords(query) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `Extract relevant financial keywords from this query: \"${query}\". Also, normalize synonyms like 'cost' -> 'price', 'value' -> 'price', 'increase' -> 'growth', etc.` }] }]
            }
        );
        const keywords = response.data.candidates[0]?.content?.parts[0]?.text.split(", ") || [];
        return keywords.map(keyword => keyword.toLowerCase());
    } catch (error) {
        console.error("Error extracting keywords:", error);
        return [];
    }
}

// ✅ Make sure it's correctly exported
module.exports = { getStockSymbol,getRelevantKeywords };
