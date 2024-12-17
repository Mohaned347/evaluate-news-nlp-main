// client.js
import { validateInput, analyzeInput } from './js/formHandler';
import './styles/styles.scss';

// DOM Elements
const form = document.getElementById('urlForm');
const clearButton = document.getElementById('clearButton');
const inputField = document.getElementById('urlInput');
const resultDiv = document.getElementById('result');

// Event listener for form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputURL = inputField.value.trim();

    resultDiv.innerHTML = ''; // Clear previous results

    // Validate URL input
    if (!validateInput(inputURL)) {
        alert('Please enter a valid URL.');
        return;
    }

    inputField.disabled = true; // Disable input during request
    showLoadingIndicator();

    try {
        const result = await analyzeInput(inputURL); // Call formHandler logic
        renderResults(result);
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = '<p>Failed to analyze the URL. Please try again.</p>';
    } finally {
        inputField.disabled = false; // Re-enable input
    }
});

// Clear button functionality
clearButton.addEventListener('click', () => {
    inputField.value = '';
    resultDiv.innerHTML = '';
});

// Render results on the UI
function renderResults(data) {
    resultDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <p><strong>Sentiment:</strong> ${data.sentiment}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <p><strong>Agreement:</strong> ${data.agreement}</p>
    `;
}

// Show a loading indicator
function showLoadingIndicator() {
    resultDiv.innerHTML = '<p>Loading...</p>';
}
