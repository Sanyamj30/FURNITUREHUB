document.addEventListener('DOMContentLoaded', () => {
    // Close button functionality
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.signup-box').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.signup-box').style.display = 'none';
        }, 300); // Delay matches CSS transition duration
    });


    // Form submission event listener
    document.querySelector('form').addEventListener('submit', async(event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Email validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length!==6) {
            alert('Password should be exactly 6 digits.');
            return;
        }


        try {
            let response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            let data = await response.json();

            if (data.message) {
                alert('Sign Up Successful');
                localStorage.setItem('userId',data.userid);
                window.location.href = '/';  
            } else {
                alert('Sign Up Failed');  
            }

        } catch (error) {
            console.error('Error during fetch:', error);
            alert('There was an error with the request. Please try again.');
        }
    });
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}