const { default: mongoose } = require("mongoose");
const Sale = require("../models/sale.model");


/**
 * It's an async function that uses the Sale model to find all sales and then returns a status of 200 with the sales in the response body.
 */
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAsale = async (req, res) => {
  const { id } = req.params

    const  sales = await Sale.findById(id)

    if(!sales) {
      return res.status(404).json({ error: "No such sale"});
    }
    res.status(200).json(sales)

}


const addSale = async  (req, res) => {
    const {name, amount} = req.body

    try {
        const sale = await Sale.create({name, amount})
        res.status(200).json(sale)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteSale = async (req, res) => {

  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id)
    if(!deletedSale) throw Error('Sale not found')
    res.status(200).json(deletedSale)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// const updateSale = async (req, res) => {
//     const { id } = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//       return res.status(404).json({error: 'No such sale'})
//     }
//     const sale = await Sale.findOneAndUpdate({_id: id}, {
//       ...req.body
//     })
//     if(!sale) {
//       return res.status(400).json({ error: 'No such sale' })
//     }
//     res.status(200).json(sale)
// }

const updateSale = async (req, res)=> {
  const { id } = req.params
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
       { $set: req.body },
       { new:true }
    );
    res.json(updatedSale)
  }catch (error) {
    console.error(error)
    res.status(500).json({ message:'Server error' })
  }
}

module.exports = {
  getSales,
  addSale,
  deleteSale,
  updateSale,
  getAsale,
};