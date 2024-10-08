async function sendPrompt() {
    const prompt = document.getElementById('prompt').value;
    const responseContainer = document.getElementById('response');
    const sendButton = document.getElementById('sendButton');

    if (prompt.trim()) {
        showTypingAnimation(responseContainer);
        sendButton.disabled = true; // Disable button

        try {
            const response = await fetch(`https://nash-rest-api.onrender.com/Mixtral?userId=1234&message=${encodeURIComponent(prompt)}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const formattedResponse = formatResponse(data.response);

            stopTypingAnimation(responseContainer);
            responseContainer.innerHTML = formattedResponse || "No response received.";
        } catch (error) {
            console.error("Fetch error:", error);
            stopTypingAnimation(responseContainer);
            responseContainer.innerText = `Error fetching response: Something went wrong.`;
        } finally {
            sendButton.disabled = false; // Re-enable button
        }
    } else {
        alert('Please enter a valid prompt.');
    }
}

function formatResponse(response) {
    return response
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/- (.*?)\n/g, '<li>$1</li>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

function showTypingAnimation(container) {
    container.innerHTML = `
        <div class="typing">
            <div class="typing-indicator"></div>
            <div class="typing-indicator"></div>
            <div class="typing-indicator"></div>
        </div>
    `;
}

function stopTypingAnimation(container) {
    container.innerHTML = '';
}

// A fallback function to ensure response container works
window.onload = () => {
    const responseContainer = document.getElementById('response');
    responseContainer.innerText = "Test Response: The code is working.";
};