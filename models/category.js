const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const customError=require('../utils/customError');
//new schema for category
const categorySchema =new Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
  },
  subCategory:[{
    type:Schema.Types.ObjectId,
    ref:"subCategory"
  }],

},{timestamps:true});

categorySchema.pre('save',async function (next){
  try {
    const category =this;

    const foundCategory=await mongoose.model('Category',categorySchema).findOne({name:category.name});

    if(foundCategory){
      return next(new customError('Already category added',403));
    }
    next();
  } catch (error) {
    next(error);
  }
})

categorySchema.post('findOneAndDelete', async function(category,next){
  try {
    if(category && category.subCategory.length>0){
    //delete all sub category of this category
    await mongoose.model('subCategory').deleteMany({_id: {$in:category.subCategory}});

    //delete all product of this category
    await mongoose.model('Product').deleteMany({
      category:category._id
    });

    }
    next();
  } catch (error) {
    next(error);
  }
})
categorySchema.index({ name: 1 });


const Category=mongoose.model("Category",categorySchema);

module.exports=Category;