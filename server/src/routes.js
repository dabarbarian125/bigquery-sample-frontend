"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes.ts
const express_1 = require("express");
const bigqueryClient_1 = require("./bigqueryClient");
const router = (0, express_1.Router)();
router.get('/data', async (req, res) => {
    try {
        const rows = await (0, bigqueryClient_1.getAllData)();
        res.json(rows); // This implicitly returns a `Promise<Response>`
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/data', async (req, res) => {
    const { intValue, stringValue } = req.body;
    // Validate input
    if (typeof intValue !== 'number' || typeof stringValue !== 'string') {
        res.status(400).json({ error: 'Invalid input' });
        return; // Explicit return after sending a response
    }
    try {
        await (0, bigqueryClient_1.insertData)(intValue, stringValue);
        res.json({ status: 'success' }); // Sends a JSON response
    }
    catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
