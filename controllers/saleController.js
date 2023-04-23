// const Sale = require('../models/Sales')
// const mongoose = require('mongoose')

// // get all sales
// const getSales = async (req, res) => {
//   const user_id = req.user._id

//   const sales = await Sale.find({userId: user_id}).sort({createdAt: -1})

//   res.status(200).json(sales)
// }

// // get a single sale
// const getSale = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such sale'})
//   }

//   const sale = await Sale.findById(id)

//   if (!sale) {
//     return res.status(404).json({error: 'No such sale'})
//   }
  
//   res.status(200).json(sale)
// }


// // create new sale
// // const createSale = async (req, res) => {
// //   const {productname, price} = req.body

// //   let emptyFields = []

// //   if(!productname) {
// //     emptyFields.push('productname')
// //   }
// //   if(!price) {
// //     emptyFields.push('price')
// //   }
// //   if(emptyFields.length > 0) {
// //     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
// //   }

// //   // add doc to db
// //   try {
// //     const user_id = req.user._id
// //     const sale = await Sale.create({productname, price, user_id})
// //     res.status(200).json(sale)
// //   } catch (error) {
// //     res.status(400).json({error: error.message})
// //   }
// // }

// const createSale = async (req, res) => {
//   try {
//     const { productname, price } = req.body;
//     const { userId } = req.params;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create a new sale object and save it to the database
//     const newSale = new Sale({
//       user: userId,
//       productname,
//       price
//     });
//     await newSale.save();

//     // Add the new sale to the user's sales array
//     user.sales.push(newSale._id);
//     await user.save();

//     // Return the new sale object as a JSON response
//     res.json(newSale);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// // delete a sale
// const deleteSale = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such sale'})
//   }

//   const sale = await Sale.findOneAndDelete({_id: id})

//   if (!sale) {
//     return res.status(400).json({error: 'No such sale'})
//   }

//   res.status(200).json(sale)
// }

// // update a sale
// const updateSale = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such sale'})
//   }

//   const sale = await Sale.findOneAndUpdate({_id: id}, {
//     ...req.body
//   })

//   if (!sale) {
//     return res.status(400).json({error: 'No such sale'})
//   }

//   res.status(200).json(sale)
// }


// module.exports = {
//   getSales,
//   getSale,
//   createSale,
//   deleteSale,
//   updateSale
// }