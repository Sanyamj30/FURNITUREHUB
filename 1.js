let products = [];

// Fetch JSON data and initialize products array
fetch('first.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Check if data contains "products" array
        if (data && Array.isArray(data.products)) {
            products = data.products;
            displayProducts(products); // Call the display function after fetching data
        } else {
            console.error('Invalid JSON format: Expected an array of products');
        }
    })
    .catch(error => console.error('Error loading JSON:', error));

// Display products on the page
function displayProducts(products) {
    const categoriesContainer = document.querySelector('.categories');
    categoriesContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('category-item');

        // Set up HTML content for each product
        categoryItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 350px; height: 380px;">
            <a href="${product.url}">${product.name}</a>
            <p>${product.description}</p>
        `;

        // Append product to the categories container
        categoriesContainer.appendChild(categoryItem);
    });
}

// Search functionality
document.querySelector('.search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const searchQuery = event.target.value.toLowerCase().trim();
        const product = products.find(item => item.name.toLowerCase() === searchQuery);

        if (product) {
            window.location.href = product.url;
        } else {
            alert("Product not found. Please try a different search term.");
        }
    }
});
