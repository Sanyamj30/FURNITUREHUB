// const express = require('express');
// const app = express();
// const PORT = 5000;

// // Middleware to serve static files
// app.use(express.static('public')); // Serve HTML, CSS, JS files from the 'public' directory

// // Sample route
// app.get('/', (req, res) => {
//     res.json({
//         products: [
//             {
//                 name: "Dining Table",
//                 category: "Furniture",
//                 url: "bed-page.html",
//                 image: "photos/dining-table.jpg",
//                 description: "Stylish dining set."
//             },
//             {
//                 name: "Wardrobe",
//                 category: "Furniture",
//                 url: "bed-page.html",
//                 image: "photos/wardrobe.jpg",
//                 description: "Spacious wardrobe with multiple compartments."
//             },
//             // Add other products here
//         ]
//     });
// });

// app.listen(5000, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Load environment variables from .env file
// require('dotenv').config();

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth',authRoutes);

app.use('/api/cart',cartRoutes);

app.get('/api/getProducts',(req,res)=>{
  const products = [
    {
        name: "Dining Table",
        category: "Furniture",
        url: "diningtable.html",
        image: "/photos/dining-table.jpg",
        description: "set.",
        price: 69999,
    },
    {
        name: "Wardrobe",
        category: "Furniture",
        url: "wardrobe.html",
        image: "/photos/wardrobe.jpg",
        description: "Spacious wardrobe with multiple compartments.",
        price: 34999,
    },
    {
        name: "Sofa",
        category: "Furniture",
        url: "/sofa",
        image: "/photos/sofa1.jpg",
        description: "Comfortable and stylish sofa for your living room.",
        price: 44999,
    },
    {
        name: "Lamp",
        category: "Home Decor",
        url: "lamp.html",
        image: "/photos/lamp.jpg",
        description: "Modern lamp to light up your space.",
        price: 1999,
    },
    {
        name: "Study Table",
        category: "Furniture",
        url: "study-table.html",
        image: "/photos/study-table.jpg",
        description: "Functional study table with drawers.",
        price: 14999,
    },
    {
        name: "Bed",
        category: "Furniture",
        url: "/bed",
        image: "/photos/bed1.jpg",
        description: "Luxurious bed for a peaceful sleep.",
        price: 54999,
    }
];
res.json(products);
})


app.get('/',async(req,res)=>{
  let products = await fetch('http://localhost:5000/api/getProducts').then((d)=>d.json()).then((d)=>d)
  res.render('home',{products:products});
})

app.get('/signin',(req,res)=>{
  res.render('signin');
})

app.get('/signup',(req,res)=>{
  res.render('signup');
})

app.get('/cart',(req,res)=>{
  res.render('cart');
})

app.get('/about',(req,res)=>{
  res.render('about');
})

app.get('/help',(req,res)=>{
  res.render('help');
})

app.get('/bed',(req,res)=>{
  res.render('bed');
})

app.get('/sofa',(req,res)=>{
  res.render('sofa');
})

app.get('/pay',(req,res)=>{
  res.render('pay');
})

app.get('/product/:id',async(req,res)=>{
  let products = await fetch('http://localhost:5000/api/getProducts').then((d)=>d.json()).then((d)=>d)
  res.render('productPage',{products:products,id:req.params.id});
})

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
