import Item from '../models/item.model.js'

 const createItem = async (req, res) => {
  try {
    const { name, price, comment } = req.body;
    const image = req.file?.location;

    if (!image) return res.status(400).json({ message: 'Image is required' });

    const item = await Item.create({ name, image, price, comment });
    res.status(201).json({ message: 'Item created', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export default {
    createItem
}