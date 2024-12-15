// server/src/routes.ts
import { Router, Request, Response } from 'express';
import { getAllData, insertData } from './bigqueryClient';

const router = Router();

router.get('/data', async (req: Request, res: Response) => {
  try {
    const rows = await getAllData();
    res.json(rows); // This implicitly returns a `Promise<Response>`
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/data', async (req: Request, res: Response) => {
  const { intValue, stringValue } = req.body;

  // Validate input
  if (typeof intValue !== 'number' || typeof stringValue !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return; // Explicit return after sending a response
  }

  try {
    await insertData(intValue, stringValue);
    res.json({ status: 'success' }); // Sends a JSON response
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

