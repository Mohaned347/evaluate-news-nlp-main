import { checkForName } from './nameChecker'

const serverURL = 'http://localhost:8800/api'; // Use http for local development

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('urlInput').value;

    if (isValidURL(formText)) {
        sendToServer(formText);
    } else {
        alert("Please enter a valid URL");
    }
}

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    return pattern.test(url);
}

function sendToServer(url) {
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('URL sent successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error sending URL');
    });
}

export { handleSubmit };
