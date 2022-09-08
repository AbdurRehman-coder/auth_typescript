
import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
},
price: {
    type: Number,
    required: true,
    minlength: 2
},
inStock: {
    type: Boolean,
    default: true,
}
},
{
    timestamps: true,
});

const Products = mongoose.model('Products',  productSchema);

export default Products;