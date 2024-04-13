import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    salesId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    items: [{
        type: String,
        required: true
    }],
    totalBill: {
        type: Number,
        required: true
    }

},{timestamps:true});
export default mongoose.model('sales',salesSchema);