// formHandler.js

// Function to validate user input (URL)
function validateInput(inputText) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    return pattern.test(inputText.trim());
}

// Function to call the Meaning Cloud API via the server
async function analyzeInput(inputURL) {
    try {
        const response = await fetch('http://localhost:8800/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: inputURL }),
        });

        const data = await response.json();
        return processApiResponse(data); // Process API response
    } catch (error) {
        console.error('Error analyzing input:', error);
        throw new Error('Error communicating with the server.');
    }
}

// Function to process and format API response
function processApiResponse(data) {
    if (data.status && data.status.code === '0') {
        return {
            sentiment: formatSentiment(data.score_tag),
            subjectivity: data.subjectivity,
            agreement: data.agreement,
        };
    } else {
        throw new Error('Invalid API response.');
    }
}

// Helper function to format sentiment results
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

export { validateInput, analyzeInput };
