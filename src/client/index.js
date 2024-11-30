import { checkForName } from './js/nameChecker';
import './styles/styles.scss';
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('urlInput').value = '';  // Clear input field
    document.getElementById('result').innerHTML = ''; // Clear results if needed
  });

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value.trim();
  const resultDiv = document.getElementById('result');

  resultDiv.innerHTML = '';  // Clear previous results
  urlInput.disabled = true;  // Disable input to prevent multiple requests
  showLoadingIndicator(resultDiv);

  if (!isValidURL(url)) {
    alert("Please enter a valid URL");
    urlInput.disabled = false;  // Re-enable input
    resultDiv.innerHTML = '';  // Clear loading
    return;
  }

  try {
    const response = await fetch('http://localhost:8800/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    displayResults(data, resultDiv);
  } catch (error) {
    console.error('Error:', error);
    resultDiv.innerHTML = '<p>Error analyzing the URL. Please try again.</p>';
  } finally {
    urlInput.disabled = false;  // Re-enable input after request
  }
}

function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  return pattern.test(url);
}

function displayResults(data, resultDiv) {
  if (data.status.code === '0') {
    const { score_tag, subjectivity, agreement } = data;
    resultDiv.innerHTML = `
      <h3>Analysis Results</h3>
      <p><strong>Sentiment:</strong> ${formatSentiment(score_tag)}</p>
      <p><strong>Subjectivity:</strong> ${subjectivity}</p>
      <p><strong>Agreement:</strong> ${agreement}</p>
    `;
  } else {
    resultDiv.innerHTML = '<p>Error analyzing the URL. Please try again.</p>';
  }
}

function showLoadingIndicator(resultDiv) {
  resultDiv.innerHTML = '<p>Loading...</p>';
}

function formatSentiment(score) {
  switch (score) {
    case 'P+': return 'Strongly Positive';
    case 'P': return 'Positive';
    case 'NEU': return 'Neutral';
    case 'N': return 'Negative';
    case 'N+': return 'Strongly Negative';
    case 'NONE': return 'No Sentiment';
    default: return 'Unknown Sentiment';
  }
}
