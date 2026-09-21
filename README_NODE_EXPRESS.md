# VoltSense AI – Node.js & Express.js Implementation Guide

This project integrates core **Node.js** and **Express.js** requirements directly into the **VoltSense AI (EV Battery Health & Thermal Analytics Platform)**.

---

## Quick Navigation Index

Every task is demarcated in the codebase with bold comment headers:

### Part I: Node.js Fundamentals (`node_demo.js` & `batteryMath.js`)
| Task ID | Topic | File | Comment Header Search |
| :--- | :--- | :--- | :--- |
| **I.1.1** | Build First server using `http` module | [`node_demo.js`](node_demo.js) | `TASK I.1.1: BUILD FIRST SERVER APPLICATION USING 'http' MODULE` |
| **I.1.2** | Basic Routing with simple HTML / JSON | [`node_demo.js`](node_demo.js) | `TASK I.1.2: BASIC ROUTING (DEMONSTRATING SIMPLE HTML / JSON RESPONSE)` |
| **I.1.3** | Demonstrate Callbacks in Node.js | [`node_demo.js`](node_demo.js) | `TASK I.1.3: DEMONSTRATION OF CALLBACKS IN NODE.JS` |
| **I.2.1** | Synchronous File Operation | [`node_demo.js`](node_demo.js) | `TASK I.2.1: SYNCHRONOUS FILE OPERATION` |
| **I.2.2** | Asynchronous File Operation | [`node_demo.js`](node_demo.js) | `TASK I.2.2: ASYNCHRONOUS FILE OPERATION` |
| **I.3.1** | Custom Module with Mathematics Functions | [`batteryMath.js`](batteryMath.js) | `TASK I.3.1: Building Custom Module using Mathematics Functions` |

---

### Part II: Express.js Tasks (`server.js` & `views/live_status.ejs`)
| Task ID | Topic | File | Comment Header Search |
| :--- | :--- | :--- | :--- |
| **II.1** | Basic Routing using Express.js | [`server.js`](server.js) | `TASK II.1: BASIC ROUTING USING EXPRESS JS` |
| **II.2** | Serving Static Files with Built-in Middleware | [`server.js`](server.js) | `TASK II.2: SERVING STATIC FILES USING BUILT-IN MIDDLEWARE (express.static)` |
| **II.3** | Template Engine (EJS) for Dynamic Pages | [`server.js`](server.js) & [`views/live_status.ejs`](views/live_status.ejs) | `TASK II.3: TEMPLATE ENGINE (EJS) SETUP FOR DYNAMIC SERVER-SIDE RENDERING` |

---

## How to Run the Applications

### 1. Run Node.js Fundamentals Demo (Part I)
```bash
node node_demo.js
```
- Demonstrates math module functions, synchronous & asynchronous file I/O, callbacks, and starts an HTTP server on port 3000.
- **HTML Route:** `http://localhost:3000/`
- **JSON Telemetry Route:** `http://localhost:3000/api/battery`
- **JSON Thermal Route:** `http://localhost:3000/api/thermal`

---

### 2. Run Express.js Server (Part II)
```bash
node server.js
```
- **Static Platform Home:** `http://localhost:5000/` (served via `express.static`)
- **Static Dashboard:** `http://localhost:5000/dashboard.html`
- **Dynamic EJS Page:** `http://localhost:5000/live-status` (rendered using EJS template engine)
- **JSON API Routes:**
  - `GET http://localhost:5000/api/telemetry`
  - `GET http://localhost:5000/api/battery-health`
  - `POST http://localhost:5000/api/charging/start`
