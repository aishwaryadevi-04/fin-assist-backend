
// const axios = require("axios");
// require("dotenv").config();
// const { getStockSymbol } = require("../services/geminiService");  // Import Gemini-based stock symbol lookup
// const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
// const BASE_URL = "https://api.twelvedata.com";

// async function getStockPrice(symbol) {
//     try {
//         const response = await axios.get(`${BASE_URL}/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`);
//         return response.data.price ? parseFloat(response.data.price) : null;
//     } catch (error) {
//         console.error("Error fetching stock price:", error);
//         return null;
//     }
// }

// async function getStockPriceOneYearAgo(symbol) {
//     try {
//         const response = await axios.get(`${BASE_URL}/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${TWELVE_DATA_API_KEY}`);
//         if (response.data.values && response.data.values.length > 0) {
//             return parseFloat(response.data.values[response.data.values.length - 1].close);
//         }
//         return null;
//     } catch (error) {
//         console.error("Error fetching historical price:", error);
//         return null;
//     }
// }

// async function getMovingAverage(symbol, period = 14) {
//     try {
//         const response = await axios.get(`${BASE_URL}/sma?symbol=${symbol}&interval=1day&time_period=${period}&apikey=${TWELVE_DATA_API_KEY}`);
//         if (response.data && response.data.values) {
//             return parseFloat(response.data.values[0].sma);
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching moving average:", error);
//         return null;
//     }
// }



// async function getRelevantKeywords(query) {
//     try {
//         const API_KEY = process.env.GEMINI_API_KEY;
//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//             {
//                 contents: [{ parts: [{ text: `Extract relevant financial keywords from this query: "${query}"` }] }]
//             }
//         );
//         const keywords = response.data.candidates[0]?.content?.parts[0]?.text.split(", ") || [];
//         return keywords.map(keyword => keyword.toLowerCase());
//     } catch (error) {
//         console.error("Error extracting keywords:", error);
//         return [];
//     }
// }


// async function getStockReport(symbol, competitors = []) {
//     const currentPrice = await getStockPrice(symbol);
//     const pastPrice = await getStockPriceOneYearAgo(symbol);
//     const movingAverage = await getMovingAverage(symbol);
    
//     if (!currentPrice || !pastPrice || isNaN(currentPrice) || isNaN(pastPrice)) {
//         return "Error fetching stock data.";
//     }

//     const growth = (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2);
//     const competitorPerformance = competitors.length > 0 ? await getCompetitorPerformance(competitors) : {};
    
//     let competitorText = "";
//     for (let [comp, perf] of Object.entries(competitorPerformance)) {
//         competitorText += `- **${comp} Growth:** ${perf}\n`;
//     }
    
//     return `\n📜 **${symbol} Stock Report**:\n\n- **Current Price:** $${currentPrice.toFixed(2)}\n- **1-Year Growth:** ${growth}%\n- **Moving Average (14-day):** ${movingAverage ? movingAverage.toFixed(2) : "Data unavailable"}\n${competitorText}`;
// }

// async function getCompetitorPerformance(symbols) {
//     let performance = {};
    
//     for (let symbol of symbols) {
//         const currentPrice = await getStockPrice(symbol);
//         const pastPrice = await getStockPriceOneYearAgo(symbol);
        
//         if (currentPrice && pastPrice) {
//             const growth = (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2);
//             performance[symbol] = `${growth}%`;
//         } else {
//             performance[symbol] = "Data unavailable";
//         }
//     }
    
//     return performance;
// }

// async function handleUserQuery(query) {
//     let stockSymbol = await getStockSymbol(query);
//     if (!stockSymbol) return "Couldn't identify a stock symbol. Please provide a valid company name or ticker.";

//     const keywords = await getRelevantKeywords(query);

//     if (keywords.includes("price")) {
//         return await getStockPrice(stockSymbol);
//     }

//     if (keywords.includes("growth")) {
//         const pastPrice = await getStockPriceOneYearAgo(stockSymbol);
//         const currentPrice = await getStockPrice(stockSymbol);
//         if (!currentPrice || !pastPrice) return null;
//         return (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2);
//     }

//     if (keywords.includes("average")) {
//         return await getMovingAverage(stockSymbol);
//     }

//     return await getStockReport(stockSymbol);
// }

// module.exports = { 
//     getStockPrice,  
//     getStockPriceOneYearAgo,
//     getStockReport, 
//     getMovingAverage, 
//     getCompetitorPerformance, 
//     getStockSymbol,
//     getRelevantKeywords,
//     handleUserQuery 
// };
// const axios = require("axios");
// require("dotenv").config();

// const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
// const BASE_URL = "https://api.twelvedata.com";

// async function getStockPrice(symbol) {
//     try {
//         const response = await axios.get(`${BASE_URL}/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`);
//         return response.data.price ? parseFloat(response.data.price) : null;
//     } catch (error) {
//         console.error("Error fetching stock price:", error);
//         return null;
//     }
// }

// async function getStockPriceOneYearAgo(symbol) {
//     try {
//         const response = await axios.get(`${BASE_URL}/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${TWELVE_DATA_API_KEY}`);
//         if (response.data.values && response.data.values.length > 0) {
//             return parseFloat(response.data.values[response.data.values.length - 1].close);
//         }
//         return null;
//     } catch (error) {
//         console.error("Error fetching historical price:", error);
//         return null;
//     }
// }

// async function getMovingAverage(symbol, period = 14) {
//     try {
//         const response = await axios.get(`${BASE_URL}/sma?symbol=${symbol}&interval=1day&time_period=${period}&apikey=${TWELVE_DATA_API_KEY}`);
//         if (response.data && response.data.values) {
//             return parseFloat(response.data.values[0].sma);
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching moving average:", error);
//         return null;
//     }
// }

// async function getStockSymbol(query) {
//     try {
//         const response = await axios.post("https://api.gemini.com/stock-symbol", { query });
//         return response.data.symbol || null;
//     } catch (error) {
//         console.error("Error fetching stock symbol:", error);
//         return null;
//     }
// }

// async function getRelevantKeywords(query) {
//     try {
//         const API_KEY = process.env.GEMINI_API_KEY;
//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//             {
//                 contents: [{ parts: [{ text: `Extract relevant financial keywords from this query: "${query}"` }] }]
//             }
//         );
//         const keywords = response.data.candidates[0]?.content?.parts[0]?.text.split(", ") || [];
//         return keywords.map(keyword => keyword.toLowerCase());
//     } catch (error) {
//         console.error("Error extracting keywords:", error);
//         return [];
//     }
// }

// async function handleUserQuery(query) {
//     let stockSymbol = await getStockSymbol(query);
//     if (!stockSymbol) return "Couldn't identify a stock symbol. Please provide a valid company name or ticker.";

//     const keywords = await getRelevantKeywords(query);

//     if (keywords.includes("price")) {
//         return (await getStockPrice(stockSymbol))?.toFixed(2) || "Data unavailable";
//     }

//     if (keywords.includes("growth")) {
//         const pastPrice = await getStockPriceOneYearAgo(stockSymbol);
//         const currentPrice = await getStockPrice(stockSymbol);
//         if (!currentPrice || !pastPrice) return "Data unavailable";
//         return `${(((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2)}%`;
//     }

//     if (keywords.includes("average")) {
//         return (await getMovingAverage(stockSymbol))?.toFixed(2) || "Data unavailable";
//     }

//     return "Query not recognized. Please specify price, growth, or moving average.";
// }

// module.exports = { 
//     getStockPrice,  
//     getStockPriceOneYearAgo,
//     getMovingAverage, 
//     getStockSymbol,
//     getRelevantKeywords,
//     handleUserQuery 
// };
const axios = require("axios");
require("dotenv").config();
const { getFinanceAnswer } = require("./financeService");
const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = "https://api.twelvedata.com";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getStockPrice(symbol) {
    try {
        const response = await axios.get(`${BASE_URL}/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`);
        return response.data.price ? parseFloat(response.data.price) : null;
    } catch (error) {
        console.error("Error fetching stock price:", error);
        return null;
    }
}

async function getStockPriceOneYearAgo(symbol) {
    try {
        const response = await axios.get(`${BASE_URL}/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${TWELVE_DATA_API_KEY}`);
        if (response.data.values && response.data.values.length > 0) {
            return parseFloat(response.data.values[response.data.values.length - 1].close);
        }
        return null;
    } catch (error) {
        console.error("Error fetching historical price:", error);
        return null;
    }
}

async function getMovingAverage(symbol, period = 14) {
    try {
        const response = await axios.get(`${BASE_URL}/sma?symbol=${symbol}&interval=1day&time_period=${period}&apikey=${TWELVE_DATA_API_KEY}`);
        if (response.data && response.data.values) {
            return parseFloat(response.data.values[0].sma);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching moving average:", error);
        return null;
    }
}

async function getStockSymbol(companyName) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Given the company name \"${companyName}\", return only its stock ticker symbol (e.g., Microsoft -> MSFT, Apple -> AAPL, Infosys -> INFY). Do not provide any explanations or code. If the company is not found, return \"UNKNOWN\".`
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
                contents: [{ 
                    parts: [{ 
                        text: `Extract relevant financial keywords from this query: \"${query}\". Normalize synonyms like 'cost' -> 'price', 'value' -> 'price', 'increase' -> 'growth'. Return only individual words in a comma-separated format.` 
                    }] 
                }]
            }
        );
        
        const extractedText = response.data.candidates[0]?.content?.parts[0]?.text.trim();
        
        // Split by comma and whitespace, normalize words
        const keywords = extractedText ? extractedText.split(/,\s*/) : [];

        return keywords.map(keyword => keyword.toLowerCase());
    } catch (error) {
        console.error("Error extracting keywords:", error);
        return [];
    }
}

async function getStockReport(symbol, competitors = []) {
    const currentPrice = await getStockPrice(symbol);
    const pastPrice = await getStockPriceOneYearAgo(symbol);
    const movingAverage = await getMovingAverage(symbol);
    
    if (!currentPrice || !pastPrice || isNaN(currentPrice) || isNaN(pastPrice)) {
        return "Error fetching stock data.";
    }

    const growth = (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2);
    const competitorPerformance = competitors.length > 0 ? await getCompetitorPerformance(competitors) : {};
    
    let competitorText = "";
    for (let [comp, perf] of Object.entries(competitorPerformance)) {
        competitorText += `- **${comp} Growth:** ${perf}\n`;
    }
    
    return `\n📜 **${symbol} Stock Report**:\n\n- **Current Price:** $${currentPrice.toFixed(2)}\n- **1-Year Growth:** ${growth}%\n- **Moving Average (14-day):** ${movingAverage ? movingAverage.toFixed(2) : "Data unavailable"}\n${competitorText}`;
}
async function handleUserQuery(query) {
    const stockSymbol = await getStockSymbol(query);
    // if (!stockSymbol) {
    //     return "Couldn't identify a stock symbol. Please provide a valid company name or ticker.";
    // }

    const keywords = await getRelevantKeywords(query);
    console.log(keywords)
    if (keywords.includes("price")) {
        const currentPrice = await getStockPrice(stockSymbol);
        return currentPrice ? `The current price of ${stockSymbol} is $${currentPrice.toFixed(2)}.` : "Current price data is unavailable.";
    }

    if (keywords.includes("history") || keywords.includes("historical")) {
        const pastPrice = await getStockPriceOneYearAgo(stockSymbol);
        return pastPrice ? `The price of ${stockSymbol} one year ago was $${pastPrice.toFixed(2)}.` : "Historical price data is unavailable.";
    }

    if (keywords.includes("growth")) {
        const currentPrice = await getStockPrice(stockSymbol);
        const pastPrice = await getStockPriceOneYearAgo(stockSymbol);
        if (currentPrice && pastPrice) {
            const growth = (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2);
            return `${stockSymbol} has experienced a growth of ${growth}% over the past year.`;
        }
    }

    if (keywords.includes("moving average")) {
        const movingAverage = await getMovingAverage(stockSymbol);
        return movingAverage ? `The 14-day moving average for ${stockSymbol} is $${movingAverage.toFixed(2)}.` : "Moving average data is unavailable.";
    }
    if (keywords.includes("report")) {
        return await getStockReport(stockSymbol);
    }
    return await getFinanceAnswer(query);
}


module.exports = { 
    getStockPrice,  
    getStockPriceOneYearAgo,
    getMovingAverage, 
    getStockSymbol,
    getStockReport,
    getRelevantKeywords,
    handleUserQuery 
};
