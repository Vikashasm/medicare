const productService=require('../../service/product.service')

const readProductEntry=async(req,res)=>{
    try {
        const products=await productService.updateProduct({_id:req.params.productId},{read:true})
        if(products.length>0){
            return res.status(201).json({
                success:true,
                message:'products List',
                products:products
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no user",
                products:products
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[readProductEntry]