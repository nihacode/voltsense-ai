/**
 * ==============================================================================
 * TASK I.3.1: Building Custom Module using Mathematics Functions
 * Project: VoltSense AI – EV Battery Health & Thermal Analytics Platform
 * ==============================================================================
 * This custom module demonstrates exporting mathematical functions in Node.js
 * to calculate essential EV Battery parameters (State of Health, Power, and Range).
 */

// 1. Math function to calculate Battery State of Health (SoH %)
function calculateStateOfHealth(currentCapacityAh, originalCapacityAh) {
    if (originalCapacityAh <= 0) return 0;
    // Math: (Current Capacity / Original Capacity) * 100
    const soh = (currentCapacityAh / originalCapacityAh) * 100;
    return parseFloat(soh.toFixed(2));
}

// 2. Math function to calculate Instantaneous Electrical Power (kW)
// Formula: Power (P) = Voltage (V) * Current (I) / 1000
function calculatePowerKW(voltageVolts, currentAmps) {
    const power = (voltageVolts * currentAmps) / 1000;
    return parseFloat(power.toFixed(2));
}

// 3. Math function to compute Estimated Driving Range (km)
// Formula: Range = (Remaining kWh / Energy Consumption Rate per km)
function calculateRemainingRangeKm(packKWh, stateOfChargePercent, consumptionRateKWhPerKm) {
    const availableKWh = packKWh * (stateOfChargePercent / 100);
    const range = availableKWh / consumptionRateKWhPerKm;
    return Math.round(range);
}

// 4. Math function to calculate thermal variance between hottest and coldest cell
function calculateCellTempDelta(cellTemperatures) {
    if (!Array.isArray(cellTemperatures) || cellTemperatures.length === 0) return 0;
    const maxTemp = Math.max(...cellTemperatures);
    const minTemp = Math.min(...cellTemperatures);
    return parseFloat((maxTemp - minTemp).toFixed(2));
}

// Export the mathematical functions as a custom Node.js module
module.exports = {
    calculateStateOfHealth,
    calculatePowerKW,
    calculateRemainingRangeKm,
    calculateCellTempDelta
};
