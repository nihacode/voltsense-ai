/**
 * ==============================================================================
 * VOLTSENSE AI: BATTERY TELEMETRY MONGOOSE MODEL
 * File: models/BatteryTelemetry.js
 * ==============================================================================
 * Defines the MongoDB schema for EV pack telemetry with strict data validation,
 * sanitization, enum constraints, and indexing.
 */

const mongoose = require('mongoose');

const batteryTelemetrySchema = new mongoose.Schema(
  {
    packId: {
      type: String,
      required: [true, 'Battery Pack ID is required (e.g. EV-8842-CATL)'],
      trim: true,
      uppercase: true,
      match: [/^EV-[A-Z0-9-]+$/, 'Pack ID must follow format: EV-XXXX (e.g. EV-8842-CATL)'],
      index: true,
    },
    voltage: {
      type: Number,
      required: [true, 'Pack voltage reading is required'],
      min: [200, 'Pack voltage cannot be below 200V'],
      max: [900, 'Pack voltage cannot exceed 900V'],
    },
    current: {
      type: Number,
      required: [true, 'Current draw/charge reading in Amperes is required'],
    },
    temperature: {
      type: Number,
      required: [true, 'Pack temperature in Celsius is required'],
      min: [-40, 'Temperature cannot be below -40°C'],
      max: [90, 'Temperature cannot exceed 90°C'],
    },
    stateOfCharge: {
      type: Number,
      required: [true, 'State of Charge (SoC %) is required'],
      min: [0, 'SoC cannot be less than 0%'],
      max: [100, 'SoC cannot exceed 100%'],
    },
    stateOfHealth: {
      type: Number,
      required: [true, 'State of Health (SoH %) is required'],
      min: [0, 'SoH cannot be less than 0%'],
      max: [100, 'SoH cannot exceed 100%'],
      default: 100,
    },
    thermalStatus: {
      type: String,
      enum: {
        values: ['OPTIMAL', 'WARNING', 'CRITICAL'],
        message: '{VALUE} is not a supported thermal status. Must be OPTIMAL, WARNING, or CRITICAL.',
      },
      default: 'OPTIMAL',
    },
    operatorNotes: {
      type: String,
      trim: true,
      maxlength: [300, 'Operator notes cannot exceed 300 characters'],
      default: '',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Virtual property: Instantaneous Power in kW (P = V * I / 1000)
batteryTelemetrySchema.virtual('powerKW').get(function () {
  if (this.voltage && this.current) {
    return parseFloat(((this.voltage * this.current) / 1000).toFixed(2));
  }
  return 0;
});

// Pre-save hook: Automatically evaluate thermal status based on pack temperature
batteryTelemetrySchema.pre('save', function () {
  if (this.temperature >= 60) {
    this.thermalStatus = 'CRITICAL';
  } else if (this.temperature >= 40) {
    this.thermalStatus = 'WARNING';
  } else {
    this.thermalStatus = 'OPTIMAL';
  }
});

// Configure JSON serialization to include virtual properties
batteryTelemetrySchema.set('toJSON', { virtuals: true });
batteryTelemetrySchema.set('toObject', { virtuals: true });

const BatteryTelemetry = mongoose.model('BatteryTelemetry', batteryTelemetrySchema);

module.exports = BatteryTelemetry;
