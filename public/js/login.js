    document.addEventListener('DOMContentLoaded', () => {

        console.log('DOM LOADED')
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
                let response = await fetch('/api/auth/signin', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, password: password })
                });

                let data = await response.json();
                // console.log(data)
                if (data.message) {
                    alert('Log In Successful');
                    localStorage.setItem('userId',data.userid);
                    window.location. href = '/';
                } else {
                    alert('Sign Up Failed'); 
                }

            } catch (error) {
                console.error('Error during fetch:', error);
                alert('There was an error with the request. Please try again.');
            }
        });
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
