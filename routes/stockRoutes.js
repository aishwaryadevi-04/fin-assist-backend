const express = require("express");
const { getStockPrice, getHistoricalData } = require("../services/stockService");

const router = express.Router();

// Route to get real-time stock price
router.get("/price/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const stockPrice = await getStockPrice(symbol);
        res.json({ response: stockPrice });
    } catch (error) {
        console.error("Stock Price Error:", error);
        res.json({ response: "Error fetching stock price." });
    }
});

// Route to get historical stock data
router.get("/history/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const history = await getHistoricalData(symbol);
        res.json({ response: history });
    } catch (error) {
        console.error("Stock History Error:", error);
        res.json({ response: "Error fetching historical data." });
    }
});

module.exports = router;
