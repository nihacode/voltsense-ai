/**
 * ==============================================================================
 * VOLTSENSE AI: EV BATTERY HEALTH & THERMAL ANALYTICS PLATFORM
 * SCRIPT: server.js
 * 
 * OBJECTIVE II: EXPRESS.JS BACKEND & TEMPLATE ENGINE
 * ------------------------------------------------------------------------------
 * This file contains clear, marked sections demonstrating:
 *   II.1 - Basic Routing using Express JS (GET / POST routes & JSON APIs)
 *   II.2 - Serving Static Files using Express Built-in Middleware (express.static)
 *   II.3 - Template Engine (EJS) for Dynamic Server-Rendered Pages
 * ==============================================================================
 */

const express = require('express');
const path = require('path');
const batteryMath = require('./batteryMath'); // Reusing custom math module

const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware for JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ==============================================================================
// TASK II.2: SERVING STATIC FILES USING BUILT-IN MIDDLEWARE (express.static)
// ==============================================================================
/**
 * With express.static, static files such as HTML (index.html, dashboard.html),
 * CSS (style.css), client-side JS, and images (assets/) are served automatically.
 */
console.log("Configuring Task II.2: Static files middleware...");
app.use(express.static(path.join(__dirname)));


// ==============================================================================
// TASK II.3: TEMPLATE ENGINE (EJS) SETUP FOR DYNAMIC SERVER-SIDE RENDERING
// ==============================================================================
/**
 * Configuring EJS as the view engine to render dynamic web pages with real-time data.
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dynamic Route rendered using EJS Template Engine
app.get('/live-status', (req, res) => {
    // Dynamic calculations using custom mathematical module (Task I.3)
    const packVoltage = 396.4;
    const currentDraw = 118.2;
    const powerOutput = batteryMath.calculatePowerKW(packVoltage, currentDraw);
    const healthPercent = batteryMath.calculateStateOfHealth(69.2, 75.0);
    const estRange = batteryMath.calculateRemainingRangeKm(75, 84, 0.16);

    // Mock dynamic cell array
    const cellModules = [
        { id: 1, temp: 31.8, voltage: 3.96 },
        { id: 2, temp: 32.4, voltage: 3.97 },
        { id: 3, temp: 35.8, voltage: 3.95 },
        { id: 4, temp: 32.1, voltage: 3.96 },
        { id: 5, temp: 33.0, voltage: 3.97 },
        { id: 6, temp: 34.5, voltage: 3.96 }
    ];

    const alertsList = [
        { severity: "INFO", message: "Fast charging protocol initiated (85 kW peak).", time: "10:15 AM" },
        { severity: "WARNING", message: "Cell #3 temperature slightly elevated (35.8°C).", time: "10:22 AM" }
    ];

    // Rendering dynamic EJS template with data payload
    res.render('live_status', {
        title: "Live Thermal Telemetry",
        serverTime: new Date().toLocaleString(),
        vehicle: {
            model: "Tata Nexon EV Max",
            regNo: "MH-12-EV-2024"
        },
        battery: {
            voltage: packVoltage,
            current: currentDraw,
            powerKW: powerOutput,
            soc: 84,
            soh: healthPercent,
            rangeKm: estRange
        },
        cells: cellModules,
        alerts: alertsList
    });
});


// ==============================================================================
// TASK II.1: BASIC ROUTING USING EXPRESS JS
// ==============================================================================

// --- 1. Basic Route: Root path redirects/serves the main platform home ---
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 2. Basic Route: JSON API endpoint for real-time telemetry ---
app.get('/api/telemetry', (req, res) => {
    const telemetryData = {
        platform: "VoltSense AI",
        timestamp: new Date().toISOString(),
        battery: {
            voltageVolts: 395.2,
            currentAmps: 120.5,
            powerKW: batteryMath.calculatePowerKW(395.2, 120.5),
            stateOfHealthPercent: batteryMath.calculateStateOfHealth(68.5, 75.0),
            stateOfChargePercent: 82,
            estimatedRangeKm: batteryMath.calculateRemainingRangeKm(75, 82, 0.165)
        },
        thermal: {
            coolantInletTemp: 26.4,
            coolantOutletTemp: 31.2,
            averagePackTemp: 32.5,
            coolingPumpRPM: 2800,
            thermalStatus: "OPTIMAL"
        }
    };
    res.json(telemetryData);
});

// --- 3. Basic Route: JSON API endpoint for battery health statistics ---
app.get('/api/battery-health', (req, res) => {
    res.json({
        ratedCapacityAh: 75.0,
        currentCapacityAh: 68.5,
        calculatedSoH: `${batteryMath.calculateStateOfHealth(68.5, 75.0)}%`,
        cycleCount: 428,
        estimatedLifeRemainingYears: 5.2,
        warrantyStatus: "ACTIVE"
    });
});

// --- 4. Basic Route: POST request simulating charging command ---
app.post('/api/charging/start', (req, res) => {
    const { chargerType, targetSoC } = req.body;
    res.json({
        success: true,
        message: "Charging sequence initiated successfully.",
        chargerType: chargerType || "DC-FAST-50kW",
        targetSoC: targetSoC || 80,
        startTime: new Date().toISOString()
    });
});

// --- 5. 404 Route Handler for undefined routes ---
app.use((req, res) => {
    res.status(404).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #ef4444;">404 - Page Not Found</h1>
            <p>The requested route <code>${req.originalUrl}</code> was not found on VoltSense AI server.</p>
            <a href="/" style="color: #2563eb; text-decoration: none;">Return to Home</a>
        </div>
    `);
});


// ==============================================================================
// START THE EXPRESS.JS SERVER
// ==============================================================================
app.listen(PORT, () => {
    console.log("\n=======================================================");
    console.log(`>>> TASK II: EXPRESS.JS SERVER RUNNING ON PORT ${PORT}`);
    console.log(`>>> 1. Static Home:       http://localhost:${PORT}/`);
    console.log(`>>> 2. Static Dashboard:  http://localhost:${PORT}/dashboard.html`);
    console.log(`>>> 3. Dynamic EJS Page:  http://localhost:${PORT}/live-status (Task II.3)`);
    console.log(`>>> 4. API Telemetry:     http://localhost:${PORT}/api/telemetry (Task II.1)`);
    console.log(`>>> 5. API Health:        http://localhost:${PORT}/api/battery-health`);
    console.log("=======================================================\n");
});
