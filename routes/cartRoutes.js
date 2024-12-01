const express = require('express');
const Cart = require('../models/cart');  // Assuming your schema is in 'models/cart.js'
const router = express.Router();

const products = [
    {
        name: "Dining Table",
        category: "Furniture",
        url: "bed-page.html",
        image: "photos/dining-table.jpg",
        description: "set.",
        price: 69999,
    },
    {
        name: "Wardrobe",
        category: "Furniture",
        url: "bed-page.html",
        image: "photos/wardrobe.jpg",
        description: "Spacious wardrobe with multiple compartments.",
        price: 34999,
    },
    {
        name: "Sofa",
        category: "Furniture",
        url: "sofa-page.html",
        image: "photos/sofa1.jpg",
        description: "Comfortable and stylish sofa for your living room.",
        price: 44999,
    },
    {
        name: "Lamp",
        category: "Home Decor",
        url: "lamp.html",
        image: "photos/lamp.jpg",
        description: "Modern lamp to light up your space.",
        price: 1999,
    },
    {
        name: "Study Table",
        category: "Furniture",
        url: "study-table.html",
        image: "photos/study-table.jpg",
        description: "Functional study table with drawers.",
        price: 14999,
    },
    {
        name: "Bed",
        category: "Furniture",
        url: "bed-page.html",
        image: "photos/bed1.jpg",
        description: "Luxurious bed for a peaceful sleep.",
        price: 54999,
    }
];

router.post('/add', async (req, res) => {
    const { userId, itemId } = req.body; // item contains id, quantity, price
    let price = products[itemId].price;
    let item = {price:price,quantity:1,id:itemId}
    try {
      // Find the cart by userId
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({
          userId,
          items: [item],
          total: item.quantity * item.price,
          date: new Date(),
          ordered: false
        });
      } else {
        // If cart exists, check if the item is already in the cart
        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.id === item.id);
  
        if (existingItemIndex !== -1) {
          // If item exists, increment the quantity and update total
          cart.items[existingItemIndex].quantity += item.quantity;
          cart.total += item.quantity * item.price;
        } else {
          // If item doesn't exist, add it to the cart
          cart.items.push(item);
          cart.total += item.quantity * item.price;
        }
      }
  
      await cart.save();
      res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error });
    }
  });
  

// Place Order (set ordered: true)
router.post('/place-order', async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Set the ordered flag to true
    cart.ordered = true;
    await cart.save();

    res.status(200).json({ message: 'Order placed successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});
router.get('/:id',async(req,res)=>{
    let userId = req.params.id;
    let cart = await Cart.findOne({ userId,ordered:false });
    if(!cart){
        res.status().json({message:"No Cart"})
    }
    res.status(200).json({message:"Cart",cart:cart});
})

// Delete Item from Cart
router.delete('/delete-item', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item index and remove it
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Remove the item from the cart
    const itemPrice = cart.items[itemIndex].price * cart.items[itemIndex].quantity;
    cart.items.splice(itemIndex, 1);
    cart.total -= itemPrice;

    await cart.save();

    res.status(200).json({ message: 'Item deleted from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from cart', error });
  }
});

module.exports = router;
