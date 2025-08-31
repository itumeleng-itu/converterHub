
        // Tab switching functionality
        function switchTab(tabName) {
            // Hide all converters
            const converters = document.querySelectorAll('.converter');
            converters.forEach(converter => {
                converter.classList.remove('active');
            });

            // Remove active class from all tab buttons
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });

            // Show selected converter
            document.getElementById(tabName).classList.add('active');

            // Highlight active tab button
            event.target.classList.add('active');
        }

        // File Transfer Calculator
        function calculateFileTransfer() {
            const fileSize = parseFloat(document.getElementById('fileSize').value);
            const fileSizeUnit = document.getElementById('fileSizeUnit').value;
            const transferSpeed = parseFloat(document.getElementById('transferSpeed').value);
            const speedUnit = document.getElementById('speedUnit').value;
            const resultDiv = document.getElementById('fileTransferResult');

            if (isNaN(fileSize) || isNaN(transferSpeed) || fileSize <= 0 || transferSpeed <= 0) {
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Error</h3>
                        <div class="result-value error">Please enter valid positive numbers</div>
                    </div>
                `;
                return;
            }

            // Convert file size to bytes
            const fileSizeMultipliers = {
                'B': 1,
                'KB': 1024,
                'MB': 1024 * 1024,
                'GB': 1024 * 1024 * 1024,
                'TB': 1024 * 1024 * 1024 * 1024
            };

            // Convert speed to bytes per second
            const speedMultipliers = {
                'Bps': 1,
                'Kbps': 1000 / 8, // bits to bytes
                'Mbps': 1000000 / 8,
                'Gbps': 1000000000 / 8,
                'KBps': 1024,
                'MBps': 1024 * 1024
            };

            const fileSizeInBytes = fileSize * fileSizeMultipliers[fileSizeUnit];
            const speedInBytesPerSec = transferSpeed * speedMultipliers[speedUnit];

            const timeInSeconds = fileSizeInBytes / speedInBytesPerSec;

            // Convert to hours, minutes, seconds
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = Math.round(timeInSeconds % 60);

            let timeString = '';
            if (hours > 0) timeString += `${hours}h `;
            if (minutes > 0) timeString += `${minutes}m `;
            timeString += `${seconds}s`;

            resultDiv.innerHTML = `
                <div class="result-content">
                    <h3>Transfer Time</h3>
                    <div class="result-value">${timeString}</div>
                    <small style="color: #6c757d; margin-top: 10px; display: block;">
                        (${timeInSeconds.toFixed(2)} total seconds)
                    </small>
                </div>
            `;
        }

        // Temperature Converter
        function convertFromCelsius() {
            const celsius = parseFloat(document.getElementById('celsius').value);
            const fahrenheitInput = document.getElementById('fahrenheit');
            const resultDiv = document.getElementById('temperatureResult');

            if (!isNaN(celsius)) {
                const fahrenheit = (celsius * 9/5) + 32;
                fahrenheitInput.value = fahrenheit.toFixed(2);
                
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Conversion Result</h3>
                        <div class="result-value">${celsius}°C = ${fahrenheit.toFixed(2)}°F</div>
                    </div>
                `;
            } else {
                fahrenheitInput.value = '';
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Temperature Conversion</h3>
                        <div class="result-value">Enter a temperature to convert</div>
                    </div>
                `;
            }
        }

        function convertFromFahrenheit() {
            const fahrenheit = parseFloat(document.getElementById('fahrenheit').value);
            const celsiusInput = document.getElementById('celsius');
            const resultDiv = document.getElementById('temperatureResult');

            if (!isNaN(fahrenheit)) {
                const celsius = (fahrenheit - 32) * 5/9;
                celsiusInput.value = celsius.toFixed(2);
                
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Conversion Result</h3>
                        <div class="result-value">${fahrenheit}°F = ${celsius.toFixed(2)}°C</div>
                    </div>
                `;
            } else {
                celsiusInput.value = '';
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Temperature Conversion</h3>
                        <div class="result-value">Enter a temperature to convert</div>
                    </div>
                `;
            }
        }

        // Scientific Notation Converter
        function convertToScientific() {
            const number = parseFloat(document.getElementById('normalNumber').value);
            const resultDiv = document.getElementById('scientificResult');

            if (isNaN(number)) {
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Error</h3>
                        <div class="result-value error">Please enter a valid number</div>
                    </div>
                `;
                return;
            }

            if (number === 0) {
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Scientific Notation</h3>
                        <div class="result-value">0 × 10⁰</div>
                    </div>
                `;
                return;
            }

            const scientificNotation = number.toExponential();
            const parts = scientificNotation.split('e');
            const coefficient = parseFloat(parts[0]).toFixed(2);
            const exponent = parseInt(parts[1]);

            // Create superscript exponent
            const superscriptExponent = exponent.toString().split('').map(digit => {
                const superscripts = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
                return superscripts[digit] || digit;
            }).join('');

            resultDiv.innerHTML = `
                <div class="result-content">
                    <h3>Scientific Notation</h3>
                    <div class="result-value">${coefficient} × 10${superscriptExponent}</div>
                    <small style="color: #6c757d; margin-top: 10px; display: block;">
                        Standard form: ${scientificNotation}
                    </small>
                </div>
            `;
        }

        // Metric Prefix Converter
        function convertMetric() {
            const value = parseFloat(document.getElementById('metricValue').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            const resultDiv = document.getElementById('metricResult');

            if (isNaN(value)) {
                resultDiv.innerHTML = `
                    <div class="result-content">
                        <h3>Error</h3>
                        <div class="result-value error">Please enter a valid number</div>
                    </div>
                `;
                return;
            }

            const prefixMultipliers = {
                'nano': 1e-9,
                'micro': 1e-6,
                'milli': 1e-3,
                'centi': 1e-2,
                'deci': 1e-1,
                'base': 1,
                'deka': 1e1,
                'hecto': 1e2,
                'kilo': 1e3,
                'mega': 1e6,
                'giga': 1e9,
                'tera': 1e12
            };

            const prefixNames = {
                'nano': 'Nano (n)',
                'micro': 'Micro (μ)',
                'milli': 'Milli (m)',
                'centi': 'Centi (c)',
                'deci': 'Deci (d)',
                'base': 'Base Unit',
                'deka': 'Deka (da)',
                'hecto': 'Hecto (h)',
                'kilo': 'Kilo (k)',
                'mega': 'Mega (M)',
                'giga': 'Giga (G)',
                'tera': 'Tera (T)'
            };

            // Convert to base unit first, then to target unit
            const baseValue = value * prefixMultipliers[fromUnit];
            const result = baseValue / prefixMultipliers[toUnit];

            resultDiv.innerHTML = `
                <div class="result-content">
                    <h3>Conversion Result</h3>
                    <div class="result-value">${value} ${prefixNames[fromUnit]} = ${result.toExponential(3)} ${prefixNames[toUnit]}</div>
                    <small style="color: #6c757d; margin-top: 10px; display: block;">
                        Decimal: ${result.toLocaleString()}
                    </small>
                </div>
            `;
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set default active tab
            switchTab('file-transfer');
        });
