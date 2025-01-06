const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const SubCategory=require('./subCategory');
const Product=require('./products');

//new schema for category
const categorySchema =new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subCategory:[{
    type:Schema.Types.ObjectId,
    ref:"subCategory"
  }]
},{timestamps:true});

categorySchema.pre('save',async function (next){
  try {
    const category =this;
    if(!category.isNew){
      return next();
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
    await SubCategory.deleteMany({_id: {$in:category.subCategory}});

    //delete all product of this category
    await Product.deleteMany({
      category:category._id
    });

    }
    next();
  } catch (error) {
    next(error);
  }
})
categorySchema.index({ name: 1 });


module.exports=mongoose.model("Category",categorySchema);