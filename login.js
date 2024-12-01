document.addEventListener('DOMContentLoaded', () => {
    // Close button to hide the login form
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.login-box').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.login-box').style.display = 'none';
        }, 300); // Delay to match opacity transition
    });

    // Form submission event
    document.querySelector('form').addEventListener('submit',async (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Custom email validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length!==6) {
            alert('Password should be exactly 6 digits.');
            return;
        }

        try {
            let response = await fetch('http://localhost:5000/api/auth/signin', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            let data = await response.json();
            if (data.message) {
                alert('Log In Successful');
                window.location.href = 'first.html';
            } else {
                alert('Sign Up Failed'); 
            }

        } catch (error) {
            console.error('Error during fetch:', error);
            alert('There was an error with the request. Please try again.');
        }
    });

    // Toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', () => {
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });
});

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
