// Simple tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// File download time calculator
function calculateDownloadTime() {
    // Get input values
    const fileSize = parseFloat(document.getElementById('file-size').value);
    const fileUnit = document.getElementById('type-size').value;
    const speed = parseFloat(document.getElementById('int-speed').value);
    const speedUnit = document.getElementById('size-speed').value;
    const resultDiv = document.getElementById('file-result');
    
    // Check for valid inputs
    if (isNaN(fileSize) || isNaN(speed)) {
        resultDiv.innerHTML = '<span class="error">Please enter valid numbers</span>';
        return;
    }
    
    // Convert file size to KB (simplified)
    let fileSizeKB;
    if (fileUnit === 'mb') fileSizeKB = fileSize * 1024;
    else if (fileUnit === 'gb') fileSizeKB = fileSize * 1024 * 1024;
    else fileSizeKB = fileSize; // already in KB
    
    // Convert speed to KB/s (simplified)
    let speedKBps;
    if (speedUnit === 'mbps') speedKBps = speed * 125; // 1 Mbps ≈ 125 KB/s
    else speedKBps = speed / 8; // 1 Kbps = 0.125 KB/s
    
    // Calculate time in seconds
    const timeSeconds = (fileSizeKB * 8) / (speedKBps * 8); // Simplified
    
    // Display result
    if (timeSeconds < 60) {
        resultDiv.textContent = `Download time: ${timeSeconds.toFixed(1)} seconds`;
    } else if (timeSeconds < 3600) {
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = Math.floor(timeSeconds % 60);
        resultDiv.textContent = `Download time: ${minutes} minutes ${seconds} seconds`;
    } else {
        const hours = Math.floor(timeSeconds / 3600);
        const minutes = Math.floor((timeSeconds % 3600) / 60);
        resultDiv.textContent = `Download time: ${hours} hours ${minutes} minutes`;
    }
}

// Temperature converter
function convertTemp() {
    const temp = parseFloat(document.getElementById('temp-val').value);
    const type = document.getElementById('temp-type').value;
    const resultDiv = document.getElementById('temp-result');
    
    if (isNaN(temp)) {
        resultDiv.innerHTML = '<span class="error">Please enter a valid temperature</span>';
        return;
    }
    
    let celsius, fahrenheit;
    
    if (type === 'cel') {
        celsius = temp;
        fahrenheit = (temp * 9/5) + 32;
    } else {
        fahrenheit = temp;
        celsius = (temp - 32) * 5/9;
    }
    
    resultDiv.innerHTML = `
        Celsius: ${celsius.toFixed(2)}°C<br>
        Fahrenheit: ${fahrenheit.toFixed(2)}°F
    `;
}

// Scientific notation converter
function convertSci() {
    const number = parseFloat(document.getElementById('sci-val').value);
    const resultDiv = document.getElementById('sci-result');
    
    if (isNaN(number)) {
        resultDiv.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }
    
    // Simple scientific notation conversion
    const sciNotation = number.toExponential(2);
    
    resultDiv.innerHTML = `
        Scientific Notation: ${sciNotation}<br>
        Regular Number: ${number}
    `;
}

// Metric prefix converter
function convertMetric() {
    const value = parseFloat(document.getElementById('metric-val').value);
    const from = document.getElementById('metric-from').value;
    const to = document.getElementById('metric-to').value;
    const resultDiv = document.getElementById('metric-result');
    
    if (isNaN(value)) {
        resultDiv.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }
    
    // Simple conversion factors
    const factors = {
        'kilo': 1000,
        'base': 1,
        'milli': 0.001
    };
    
    // Convert to base unit first
    const baseValue = value * factors[from];
    
    // Convert to target unit
    const result = baseValue / factors[to];
    
    // Get unit symbols
    const symbols = {
        'kilo': 'k',
        'base': '',
        'milli': 'm'
    };
    
    resultDiv.innerHTML = `
        Result: ${result.toFixed(4)} ${symbols[to]}<br>
        (Converted from ${value} ${symbols[from]})
    `;
}