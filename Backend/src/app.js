const express = require('express');
const cors = require('cors');
const config = require('./config');
const rateLimiter = require('./middlewares/rateLimiter');
const errorMiddleware = require('./middlewares/error.middleware');
const logger = require('./config/logger');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const roomRoutes = require('./routes/room.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (config.env === 'production') {
  app.use('/api', rateLimiter);
}

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/rooms', roomRoutes);
apiRouter.use('/chat', chatRoutes);

app.use('/api/v1', apiRouter);

app.use((req, res, next) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: 'Not Found' });
});

app.use(errorMiddleware);

module.exports = app;