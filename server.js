const express = require("express");
const winston = require("winston");

const app = express();


// Logger setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" })
    ]
});

// Middleware to parse JSON requests
app.use(express.json());

// Exponentiation endpoint
app.get("/power", (req, res) => {
    const { base, exponent } = req.query;
    if (!base || !exponent) {
        logger.error("Missing parameters: base and exponent are required");
        return res.status(400).json({ error: "Missing parameters: base and exponent are required" });
    }
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    res.json({ operation: "power", base, exponent, result });
});

// Square root endpoint
app.get("/sqrt", (req, res) => {
    const { number } = req.query;
    if (!number || number < 0) {
        logger.error("Invalid input: non-negative number required");
        return res.status(400).json({ error: "Invalid input: non-negative number required" });
    }
    const result = Math.sqrt(parseFloat(number));
    res.json({ operation: "sqrt", number, result });
});

// Modulo endpoint
app.get("/modulo", (req, res) => {
    const { dividend, divisor } = req.query;
    if (!dividend || !divisor) {
        logger.error("Missing parameters: dividend and divisor are required");
        return res.status(400).json({ error: "Missing parameters: dividend and divisor are required" });
    }
    if (divisor == 0) {
        logger.error("Division by zero error");
        return res.status(400).json({ error: "Division by zero is not allowed" });
    }
    const result = parseFloat(dividend) % parseFloat(divisor);
    res.json({ operation: "modulo", dividend, divisor, result });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
