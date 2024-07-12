const temperatureInput = document.getElementById('temperature');
const unitSelect = document.getElementById('unit');
const convertBtn = document.getElementById('convert-btn');
const resultDisplay = document.getElementById('result');

function convertToCelsius(value, fromUnit) {
  switch (fromUnit) {
    case 'fahrenheit':
      return (value - 32) * 5 / 9;
    case 'kelvin':
      return value - 273.15;
    default:
      return value;
  }
}

function convertToFahrenheit(value, fromUnit) {
  switch (fromUnit) {
    case 'celsius':
      return (value * 9 / 5) + 32;
    case 'kelvin':
      return (value - 273.15) * 9 / 5 + 32;
    default:
      return value;
  }
}

function convertToKelvin(value, fromUnit) {
  switch (fromUnit) {
    case 'celsius':
      return value + 273.15;
    case 'fahrenheit':
      return (value - 32) * 5 / 9 + 273.15;
    default:
      return value;
  }
}

convertBtn.addEventListener('click', function() {
  const temperature = parseFloat(temperatureInput.value);
  const fromUnit = unitSelect.value;
  let convertedValue;

  if (isNaN(temperature)) {
    resultDisplay.textContent = "Please enter a valid number.";
    resultDisplay.className = ""; // Remove any color classes
    return;
  }

  switch (unitSelect.value) {
    case 'celsius':
      convertedValue = convertToFahrenheit(temperature, fromUnit);
      resultDisplay.textContent = `${temperature}°C is equal to ${convertedValue.toFixed(2)}°F`;
      break;
    case 'fahrenheit':
      convertedValue = convertToCelsius(temperature, fromUnit);
      resultDisplay.textContent = `${temperature}°F is equal to ${convertedValue.toFixed(2)}°C`;
      break;
    case 'kelvin':
      convertedValue = convertToCelsius(convertToFahrenheit(temperature, fromUnit), 'fahrenheit');
      resultDisplay.textContent = `${temperature}K is equal to ${convertedValue.toFixed(2)}°C`;
      break;
  }

  // Set background color based on temperature range
  const thresholdTooHot = 50; // Celsius
  const thresholdManageable = 20; // Celsius
  const thresholdPerfect = 10; // Celsius
  const thresholdTooCold = -10; // Celsius

  if (convertedValue > thresholdTooHot) {
    resultDisplay.className = "too-hot";
  } else if (convertedValue > thresholdManageable) {
    resultDisplay.className = "manageable";
  } else if (convertedValue > thresholdPerfect) {
    resultDisplay.className = "perfect";
  } else {
    resultDisplay.className = "too-cold";
  }
});
