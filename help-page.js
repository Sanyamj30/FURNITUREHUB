document.addEventListener("DOMContentLoaded", () => {
    // Select all help option images
    const helpOptions = document.querySelectorAll(".help-options a");

    // Add click events to each help option
    helpOptions.forEach(option => {
        option.addEventListener("click", (event) => {
            event.preventDefault();

            // Get the alt text of the image inside the link to determine the option clicked
            const optionType = option.querySelector("img").alt;

            // Display a different action based on the option clicked
            switch (optionType) {
                case "Shipping":
                    alert("Redirecting to Shipping Information...");
                    window.location.href = "shipping-info.html"; 
                    break;
                case "Return Policy":
                    alert("Redirecting to Return Policy...");
                    window.location.href = "return-policy.html"; 
                    break;
                case "Wallet":
                    alert("Redirecting to Wallet Information...");
                    window.location.href = "wallet-info.html"; 
                    break;
                case "Gift Cards":
                    alert("Redirecting to Gift Cards Information...");
                    window.location.href = "gift-cards.html"; 
                    break;
                case "Other Information":
                    alert("Redirecting to Other Information...");
                    window.location.href = "other-info.html"; 
                    break;
                case "Account Deletion":
                    alert("Redirecting to Account Deletion Information...");
                    window.location.href = "account-deletion.html"; 
                    break;
                default:
                    alert("Option not recognized.");
            }
        });
    });
});
