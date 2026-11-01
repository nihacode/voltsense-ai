/**
 * ==============================================================================
 * VOLTSENSE AI: MONGODB DATABASE CONNECTION CONFIGURATION
 * File: config/db.js
 * ==============================================================================
 * Handles connection establishment, connection monitoring events, and 
 * error resilience using Mongoose ODM.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/voltsense_db';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB service is not running
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Database Name: ${conn.connection.name}`);

    // Seed initial document so voltsense_db immediately appears in MongoDB Compass
    const BatteryTelemetry = require('../models/BatteryTelemetry');
    const count = await BatteryTelemetry.countDocuments();
    if (count === 0) {
      await BatteryTelemetry.create({
        packId: 'EV-8842-CATL',
        voltage: 395.2,
        current: 120.5,
        temperature: 32.5,
        stateOfCharge: 82,
        stateOfHealth: 96,
        thermalStatus: 'OPTIMAL',
        operatorNotes: 'Initial calibration telemetry logged automatically on startup.',
      });
      console.log('[MongoDB] Initial telemetry document seeded in "voltsense_db".');
    }
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn('[MongoDB Notice]: Ensure local MongoDB service is running (mongod) or provide MONGODB_URI.');
  }

  // Connection monitoring listeners
  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB] Connection disconnected.');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[MongoDB Runtime Error]: ${err.message}`);
  });
};

module.exports = connectDB;
