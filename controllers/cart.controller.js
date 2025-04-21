import Cart from '../models/cart.model.js';

 const createCartItem = async (req, res) => {
    try {
      const {
        product,
        subTotal,
        addressId,
        charges,
        total,
        quantity,
        price
      } = req.body;
  
      const cartItem = new Cart({
        userId:req.user.id,
        product,
        subTotal,
        addressId,
        charges,
        total,
        quantity,
        price
      });
  
      await cartItem.save();
  
      res.status(201).json({
        message: 'Cart item created',
        data: cartItem
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating cart item',
        error: error.message
      });
    }
  };
  

  const getCartItemsByUserId = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cartItems = await Cart.find({ userId });
  
      res.status(200).json({
        message: "Cart items fetched successfully",
        data: cartItems
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  


 const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Cart item not found' });

    res.status(200).json({ message: 'Cart item updated', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedItem = await Cart.findOneAndDelete({ _id: id, userId:req.user.id });
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Cart item not found or does not belong to the user' });
      }
  
      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting cart item', error: error.message });
    }
  };
  

 const deleteAllCartItems = async (req, res) => {
  try {
    const { userId } = req.user.id
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

export default {
    createCartItem,
    getCartItemsByUserId,
    deleteCartItem,
    updateCartItem,
    deleteAllCartItems
}