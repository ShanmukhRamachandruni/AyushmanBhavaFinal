import salesModel from '../models/salesModel.js';
import slugify from 'slugify';
export const createSalesController = async (req,res) =>{
    try {
       
        const { salesId, customerId, items, totalBill } = req.body
        switch (true) {
            case !salesId:
              return res.status(500).send({ error: "Sales Id is Required" });
            
            case !customerId:
              return res.status(500).send({ error: "Customer Id  is Required" });
            case !items:
              return res.status(500).send({ error: "Items is Required" });
            case !totalBill:
              return res.status(500).send({ error: "Bill is Required" });
          }


        const sales = new salesModel({...req.body})
        await sales.save()
        res.status(201).send({
            success: true,
            message : "Sales added Succesfully",
            sales,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in adding sales"
        }
        )
    }
};
export const getSalesController = async (req, res) => {
  try {
    const sales = await salesModel.find({});
    if (sales.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sales found",
      })

    }
    res.status(200).send({
      success: true,
      counTotal: sales.length,
      message: "All Sales ",
      sales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting sales",
      error: error.message,
    });
  }
};