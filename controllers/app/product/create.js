const productModel=require('../../../models/product.model')
const productService=require('../../service/product.service')

const createproduct=async(req,res)=>{
    try {
        
        const payload1={
            productName:req.body.productName,
            companyName:req.body.companyName,
            productForm:req.body.productForm,
            productImage:req.body.productImage,
            userId:req.decoded._id,
            isPublic:true
        }
        const payload2={
            productName:req.body.productName,
            companyName:req.body.companyName,
            productForm:req.body.productForm,
            productImage:req.body.productImage,
            userId:req.decoded._id,
            isPublic:false
        }
        let condition=req.decoded.isAdmin===true?payload1:payload2
        const product=await productService.createProduct(condition)
        console.log(product)
        let createdProduct = JSON.parse(JSON.stringify(product));
        createdProduct.productImagePath =await productService.productPic(product.productImage);
        if(createdProduct){
            return res.status(201).json({
                success:true,
                message:'Product added successfully',
                product:createdProduct
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to create product"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[createproduct]