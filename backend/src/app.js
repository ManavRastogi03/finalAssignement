import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import leadRoutes from './routes/lead.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

export default app;