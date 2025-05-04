import mongoose from "mongoose";

export const toursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a tour name is required"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: { type: Number, required: [true, "a tour price is requried"] }
});
