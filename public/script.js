document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic client-side validation: Check if fields are not empty
        if (!username || !password) {
            errorMessage.textContent = 'Username and password are required.';
        } else {
            // If fields are not empty, make an AJAX request to the server for authentication
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Authentication successful
                    window.location.href = 'https://server.rahulvb.com/whatsapp'; // Redirect to a dashboard or another page
                } else {
                    // Authentication failed
                    errorMessage.textContent = 'Invalid username or password.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = 'An error occurred during authentication.';
            });
        }
    });
});