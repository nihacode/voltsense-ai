/**
 * ==============================================================================
 * VOLTSENSE AI: TELEMETRY MIDDLEWARE & ERROR HANDLERS
 * File: middleware/telemetryMiddleware.js
 * ==============================================================================
 * Provides request logging, input sanitization, schema pre-validation,
 * and centralized error handling for all Express-MongoDB operations.
 */

// 1. Logging Middleware: Logs every incoming request with timestamp
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[HTTP ${req.method}] ${req.originalUrl} - ${timestamp}`);
  next();
};

// 2. Input Sanitization & Pre-Validation Middleware
const validateTelemetryPayload = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { packId, voltage, current, temperature, stateOfCharge } = req.body;

    // Basic sanitization
    if (packId && typeof packId === 'string') {
      req.body.packId = packId.trim().toUpperCase();
    }
    if (req.body.operatorNotes && typeof req.body.operatorNotes === 'string') {
      // Strip potentially harmful HTML tags
      req.body.operatorNotes = req.body.operatorNotes.replace(/<[^>]*>?/gm, '').trim();
    }

    // Require essential fields on POST
    if (req.method === 'POST') {
      if (!packId || voltage === undefined || current === undefined || temperature === undefined || stateOfCharge === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Missing required telemetry fields: packId, voltage, current, temperature, and stateOfCharge are mandatory.',
        });
      }
    }
  }
  next();
};

// 3. Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error('[Error Caught by Middleware]:', err.message);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = `Resource not found with ID of: ${err.value}`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((val) => val.message);
    message = errors.join(', ');
  }

  // Handle Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered.';
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  requestLogger,
  validateTelemetryPayload,
  errorHandler,
};
