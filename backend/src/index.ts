import express, { Request, Response } from 'express';
import cors from 'cors';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' }
];

// Routes
app.get('/items', (req: Request, res: Response) => {
  res.json(items);
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 