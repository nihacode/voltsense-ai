/**
 * ==============================================================================
 * VOLTSENSE AI: EV BATTERY HEALTH & THERMAL ANALYTICS PLATFORM
 * SCRIPT: node_demo.js
 * 
 * OBJECTIVE I: NODE.JS FUNDAMENTALS DEMONSTRATION
 * ------------------------------------------------------------------------------
 * This file contains clear, marked sections demonstrating:
 *   I.1.1 - Build First Server Application Using 'http' Module
 *   I.1.2 - Basic Routing Using Simple HTML / JSON Data
 *   I.1.3 - Demonstration of Callbacks in Node.js
 *   I.2.1 - Synchronous File Operations (fs.writeFileSync / fs.readFileSync)
 *   I.2.2 - Asynchronous File Operations (fs.writeFile / fs.readFile with callbacks)
 *   I.3.1 - Custom Mathematical Module Usage (batteryMath.js)
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// ==============================================================================
// TASK I.3.1: BUILDING & IMPORTING CUSTOM MODULE WITH MATHEMATICS FUNCTIONS
// ==============================================================================
console.log("\n=======================================================");
console.log(">>> TASK I.3.1: CUSTOM MATHEMATICS MODULE DEMO");
console.log("=======================================================");
const batteryMath = require('./batteryMath');

// Demonstrate mathematical calculations from custom module
const soh = batteryMath.calculateStateOfHealth(68.5, 75.0); // (68.5 / 75.0) * 100
const powerKW = batteryMath.calculatePowerKW(395.2, 120.5);  // (395.2 * 120.5) / 1000
const rangeKm = batteryMath.calculateRemainingRangeKm(75, 82, 0.165);
const tempDelta = batteryMath.calculateCellTempDelta([32.1, 33.5, 31.8, 34.2, 32.9]);

console.log(`[Math] Battery State of Health (SoH): ${soh}%`);
console.log(`[Math] Instantaneous Power Output:     ${powerKW} kW`);
console.log(`[Math] Estimated Remaining Range:     ${rangeKm} km`);
console.log(`[Math] Max Cell Temp Variance:         ${tempDelta} °C`);


// ==============================================================================
// TASK I.1.3: DEMONSTRATION OF CALLBACKS IN NODE.JS
// ==============================================================================
console.log("\n=======================================================");
console.log(">>> TASK I.1.3: CALLBACK IN NODE.JS DEMO");
console.log("=======================================================");

// Custom function accepting a callback to simulate async sensor reading
function readBatterySensor(sensorId, callback) {
    console.log(`[Callback] Querying sensor ${sensorId}...`);
    // Non-blocking timer simulating hardware latency
    setTimeout(() => {
        const mockReading = {
            sensor: sensorId,
            voltage: 395.4,
            packTemp: 32.8,
            timestamp: new Date().toISOString()
        };
        // Invoking the callback with null (no error) and the result
        callback(null, mockReading);
    }, 500);
}

// Executing callback
readBatterySensor("BMS-THERMAL-01", (err, data) => {
    if (err) {
        console.error("[Callback Error]:", err);
        return;
    }
    console.log("[Callback Received]: Sensor Data:", data);
});


// ==============================================================================
// TASK I.2.1: SYNCHRONOUS FILE OPERATION
// ==============================================================================
console.log("\n=======================================================");
console.log(">>> TASK I.2.1: SYNCHRONOUS FILE OPERATION (fs.writeFileSync / readFileSync)");
console.log("=======================================================");

const syncFilePath = path.join(__dirname, 'sync_battery_log.txt');
const syncLogContent = `[SYNC LOG - ${new Date().toISOString()}] VoltSense AI: Battery Pack #1 Voltage: 398.2V, Temp: 31.5C. Status: NORMAL`;

// 1. Synchronous write
fs.writeFileSync(syncFilePath, syncLogContent, 'utf-8');
console.log("[Sync File] File written synchronously to:", syncFilePath);

// 2. Synchronous read
const readSyncData = fs.readFileSync(syncFilePath, 'utf-8');
console.log("[Sync File] File read synchronously. Content:\n  ->", readSyncData);


// ==============================================================================
// TASK I.2.2: ASYNCHRONOUS FILE OPERATION
// ==============================================================================
console.log("\n=======================================================");
console.log(">>> TASK I.2.2: ASYNCHRONOUS FILE OPERATION (fs.writeFile / readFile)");
console.log("=======================================================");

const asyncFilePath = path.join(__dirname, 'async_thermal_log.json');
const telemetryPayload = JSON.stringify({
    vehicleId: "EV-NEXON-9021",
    timestamp: new Date().toISOString(),
    packHealth: `${soh}%`,
    averageTemp: "32.8 °C",
    coolingPumpActive: true
}, null, 2);

// 1. Asynchronous write with error-first callback
fs.writeFile(asyncFilePath, telemetryPayload, 'utf-8', (err) => {
    if (err) {
        console.error("[Async File Write Error]:", err);
        return;
    }
    console.log("[Async File] Data written asynchronously to:", asyncFilePath);

    // 2. Asynchronous read with error-first callback
    fs.readFile(asyncFilePath, 'utf-8', (readErr, data) => {
        if (readErr) {
            console.error("[Async File Read Error]:", readErr);
            return;
        }
        console.log("[Async File] Data read asynchronously:\n", data);
    });
});


// ==============================================================================
// TASK I.1.1: BUILD FIRST SERVER APPLICATION USING 'http' MODULE
// TASK I.1.2: BASIC ROUTING (DEMONSTRATING SIMPLE HTML / JSON RESPONSE)
// ==============================================================================
const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(`[HTTP Server] Incoming Request: ${req.method} ${url}`);

    // --- ROUTE 1: Home Page (Serving HTML) ---
    if (url === '/' || url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>VoltSense AI - HTTP Server</title>
                <style>
                    body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; text-align: center; }
                    .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #334155; }
                    h1 { color: #38bdf8; }
                    a { color: #22d3ee; margin: 0 10px; text-decoration: none; font-weight: bold; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>⚡ VoltSense AI - Native Node HTTP Server</h1>
                    <p>Demonstration of <strong>Task I.1.1 & I.1.2</strong> (http module + Basic Routing)</p>
                    <hr style="border-color: #334155; margin: 20px 0;">
                    <p>Available Routes:</p>
                    <a href="/">Home (HTML)</a> |
                    <a href="/api/battery">/api/battery (JSON)</a> |
                    <a href="/api/thermal">/api/thermal (JSON)</a>
                </div>
            </body>
            </html>
        `);
    }

    // --- ROUTE 2: Battery Telemetry Endpoint (Serving JSON) ---
    else if (url === '/api/battery') {
        const batteryData = {
            platform: "VoltSense AI",
            packVoltage: 395.2,
            packCurrentAmps: 120.5,
            stateOfHealth: `${soh}%`,
            powerKW: `${powerKW} kW`,
            estimatedRangeKm: `${rangeKm} km`,
            timestamp: new Date().toISOString()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(batteryData, null, 2));
    }

    // --- ROUTE 3: Thermal Telemetry Endpoint (Serving JSON) ---
    else if (url === '/api/thermal') {
        const thermalData = {
            system: "Thermal Management Subsystem",
            coolantTempCelsius: 28.5,
            maxCellTempCelsius: 34.2,
            minCellTempCelsius: 31.8,
            cellDeltaVariance: `${tempDelta} °C`,
            coolingFanSpeedRPM: 2400,
            status: "NOMINAL"
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(thermalData, null, 2));
    }

    // --- ROUTE 4: 404 Not Found Handler ---
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "404 Not Found",
            message: `The route '${url}' does not exist on this VoltSense server.`
        }, null, 2));
    }
});

// Start the HTTP Server
server.listen(PORT, () => {
    console.log("\n=======================================================");
    console.log(`>>> TASK I.1.1 & I.1.2: HTTP SERVER RUNNING ON PORT ${PORT}`);
    console.log(`>>> Visit: http://localhost:${PORT}/ (HTML Route)`);
    console.log(`>>> Visit: http://localhost:${PORT}/api/battery (JSON Route)`);
    console.log(`>>> Visit: http://localhost:${PORT}/api/thermal (JSON Route)`);
    console.log("=======================================================\n");
});
