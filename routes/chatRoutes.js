

// // module.exports = router;
// const express = require("express");
// const { getStockPrice, getStockHistory, getMovingAverage, getStockReport } = require("../services/stockService");
// const { getStockSymbol } = require("../services/geminiService");
// const { getFinanceAnswer } = require("../services/financeService");

// const router = express.Router();

// // Route to handle finance-related queries
// router.post("/", async (req, res) => {
//     const userMessage = req.body.message.toLowerCase();
//     let stockSymbol = null;

//     if (userMessage.includes("price of")) {
//         const companyName = userMessage.split("price of ")[1].trim();
//         stockSymbol = await getStockSymbol(companyName);
//         if (!stockSymbol) return res.json({ response: `Couldn't find stock symbol for "${companyName}".` });

//         const price = await getStockPrice(stockSymbol);
//         return res.json({ response: `Current price of ${companyName} (${stockSymbol}): $${price}` });
//     }

//     if (userMessage.includes("history of")) {
//         const companyName = userMessage.split("history of ")[1].trim();
//         stockSymbol = await getStockSymbol(companyName);
//         if (!stockSymbol) return res.json({ response: `Couldn't find stock symbol for "${companyName}".` });

//         const history = await getStockHistory(stockSymbol);
//         return res.json({ response: history });
//     }

//     if (userMessage.includes("moving average of")) {
//         const companyName = userMessage.split("moving average of ")[1].trim();
//         stockSymbol = await getStockSymbol(companyName);
//         if (!stockSymbol) return res.json({ response: `Couldn't find stock symbol for "${companyName}".` });

//         const movingAverage = await getMovingAverage(stockSymbol);
//         return res.json({ response: movingAverage });
//     }

//     // **New Feature: Stock Report Request**
//     if (userMessage.includes("stock report for") || userMessage.includes("give me a stock report on")) {
//         const companyName = userMessage.split("stock report for")[1]?.trim() || userMessage.split("give me a stock report on")[1]?.trim();
//         stockSymbol = await getStockSymbol(companyName);
//         if (!stockSymbol) return res.json({ response: `Couldn't find stock symbol for "${companyName}".` });

//         const report = await getStockReport(stockSymbol);
//         return res.json({ response: report });
//     }

//     // Default: Handle general finance queries
//     const financeResponse = await getFinanceAnswer(req.body.message);
//     return res.json({ response: financeResponse });
// });

// module.exports = router;
const express = require("express");

const { handleUserQuery } = require("../services/stockService");

const router = express.Router();

router.post("/", async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.json({ response: "Please enter a valid query." });
    }

    const response = await handleUserQuery(userMessage);
    return res.json({ response });
});

module.exports = router;
