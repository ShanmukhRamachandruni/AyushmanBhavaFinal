import customerModel from '../models/customerModel.js'
import slugify from 'slugify';
export const createCustomerController = async (req,res) =>{
    try {
       
        const { name, slug, phone, address, balance, answer } = req.body
        switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is Required" });
            
            case !phone:
              return res.status(500).send({ error: "Phone is Required" });
            case !address:
              return res.status(500).send({ error: "Address is Required" });
            case !balance:
              return res.status(500).send({ error: "Balance is Required" });
            case !answer:
              return res.status(500).send({ error: "Answer is Required" });
            
          }


        const customers = new customerModel({...req.body, slug:slugify(name)})
        await customers.save()
        res.status(201).send({
            success: true,
            message : "Customer added Succesfully",
            customers,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in adding customer"
        }
        )
    }
};

export const deleteCustomerContorller= async(req,res) =>{
  try {
    await customerModel.findByIdAndDelete(req.params.cid)
    res.status(200).send({
      success:true,
      message:"Customer Deleted Successfully",
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error in deleting customer"
  }
  )
  }
}
//update
export const updateCustomerController = async(req,res) =>{
  try {
       
    const { name,slug, email, phone, address, balance, answer } = req.body
    switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
       
        case !phone:
          return res.status(500).send({ error: "Phone is Required" });
        case !address:
          return res.status(500).send({ error: "Address is Required" });
        case !balance:
          return res.status(500).send({ error: "Balance is Required" });
        case !answer:
          return res.status(500).send({ error: "Answer is Required" });
        
      }


    const customers = await customerModel.findByIdAndUpdate(req.params.cid,{
      ...req.body,slug:slugify(name)
    },{new:true})
    res.status(201).send({
        success:true,
        message : "Customer Updated Succesfully",
        customers,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in updating customer"
    }
    )
}
}
export const getCustomerController = async (req, res) => {
  try {
    const customers = await customerModel.find({});
    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      })

    }
    res.status(200).send({
      success: true,
      counTotal: customers.length,
      message: "All Customers ",
      customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting customers",
      error: error.message,
    });
  }
};
export const getSingleCustomerController = async (req, res) => {
  try {
    const customers = await customerModel.find({slug: req.params.slug});
    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      })

    }
    res.status(200).send({
      success: true,
      counTotal: customers.length,
      message: "Single Customer ",
      customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting customers",
      error: error.message,
    });
  }
};
