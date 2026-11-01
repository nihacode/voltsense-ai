/**
 * ==============================================================================
 * VOLTSENSE AI: BATTERY TELEMETRY RESTful CRUD ROUTER
 * File: routes/batteryRoutes.js
 * ==============================================================================
 * Implements complete CRUD (Create, Read, Update, Delete) operations interacting
 * with MongoDB via Mongoose model.
 */

const express = require('express');
const router = express.Router();
const BatteryTelemetry = require('../models/BatteryTelemetry');
const { validateTelemetryPayload } = require('../middleware/telemetryMiddleware');

// ==============================================================================
// 1. CREATE: POST /api/batteries
// Description: Store new EV battery telemetry in MongoDB
// ==============================================================================
router.post('/', validateTelemetryPayload, async (req, res, next) => {
  try {
    const newRecord = await BatteryTelemetry.create(req.body);

    res.status(201).json({
      success: true,
      message: 'EV Battery telemetry recorded successfully.',
      data: newRecord,
    });
  } catch (error) {
    next(error); // Forward to centralized error handler
  }
});

// ==============================================================================
// 2. READ ALL: GET /api/batteries
// Description: Fetch all telemetry records with optional thermalStatus/packId filter
// ==============================================================================
router.get('/', async (req, res, next) => {
  try {
    const filter = {};

    // Support query filtering (e.g. /api/batteries?thermalStatus=CRITICAL)
    if (req.query.thermalStatus) {
      filter.thermalStatus = req.query.thermalStatus.toUpperCase();
    }
    if (req.query.packId) {
      filter.packId = req.query.packId.toUpperCase();
    }

    const records = await BatteryTelemetry.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
});

// ==============================================================================
// 3. READ ONE: GET /api/batteries/:id
// Description: Fetch single telemetry document by MongoDB _id
// ==============================================================================
router.get('/:id', async (req, res, next) => {
  try {
    const record = await BatteryTelemetry.findById(req.params.id);

    if (!record) {
      res.status(404);
      throw new Error(`Battery telemetry with ID ${req.params.id} was not found.`);
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
});

// ==============================================================================
// 4. UPDATE: PUT /api/batteries/:id
// Description: Update existing telemetry record (e.g. notes, voltage, SoC)
// ==============================================================================
router.put('/:id', validateTelemetryPayload, async (req, res, next) => {
  try {
    // If temperature is modified, update thermalStatus accordingly
    if (req.body.temperature !== undefined) {
      if (req.body.temperature >= 60) req.body.thermalStatus = 'CRITICAL';
      else if (req.body.temperature >= 40) req.body.thermalStatus = 'WARNING';
      else req.body.thermalStatus = 'OPTIMAL';
    }

    const updatedRecord = await BatteryTelemetry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return modified document
        runValidators: true, // Enforce schema validation rules on updates
      }
    );

    if (!updatedRecord) {
      res.status(404);
      throw new Error(`Cannot update: Battery telemetry with ID ${req.params.id} not found.`);
    }

    res.status(200).json({
      success: true,
      message: 'Battery telemetry updated successfully.',
      data: updatedRecord,
    });
  } catch (error) {
    next(error);
  }
});

// ==============================================================================
// 5. DELETE: DELETE /api/batteries/:id
// Description: Remove telemetry record from MongoDB by _id
// ==============================================================================
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedRecord = await BatteryTelemetry.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      res.status(404);
      throw new Error(`Cannot delete: Battery telemetry with ID ${req.params.id} not found.`);
    }

    res.status(200).json({
      success: true,
      message: `Telemetry record ${req.params.id} for ${deletedRecord.packId} deleted successfully.`,
      deletedId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
