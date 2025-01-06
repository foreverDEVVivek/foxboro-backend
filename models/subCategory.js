const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Category=require('./category.js');
const customError=require('../utils/customError.js');

//Separate Sub Category Schema
const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Construction Machinery", "Industrial Chemicals", "Semiconductors"],
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
},{timestamps:true});

subCategorySchema.pre('save',async function (next){
 try {
    //check that the category must exists before saving the sub category
    const subCategory=this;
    const category= await Category.findById(subCategory.category);

    if(!category){
        return next(new customError('Category not found',403))
    }

    next();

 } catch (error) {
    next(error);
 }
});

subCategorySchema.index({ name: 1, category: 1 });

module.exports =mongoose.model('subCategory',subCategorySchema);