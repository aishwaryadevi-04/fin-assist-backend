const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to handle general finance-related queries
async function getFinanceAnswer(query) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Answer the following finance-related question concisely: "${query}"`
                            }
                        ]
                    }
                ]
            }
        );

        return response.data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error("Error with Gemini API:", error);
        return "I couldn't process your request at the moment.";
    }
}

module.exports = { getFinanceAnswer };
