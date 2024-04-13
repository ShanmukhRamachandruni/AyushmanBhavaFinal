import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create a compound unique index on customer_id and phone
customerSchema.index({ customer_id: 1, phone: 1 }, { unique: true });

const Customer = mongoose.model('customer', customerSchema);

export default Customer;
