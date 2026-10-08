import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import apiRoutes from './routes.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(apiRoutes);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    apiBaseUrl,
  });
});

async function startServer(): Promise<void> {
  await connectToDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Error starting OctoFit API:', error);
  process.exitCode = 1;
});