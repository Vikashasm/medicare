const productService=require('../../service/product.service')

const listProducts=async(req,res)=>{
    try {
        const condition=[
            {
                $match:{
                    isPublic:false,
                    read:false
                }
            }
        ]
        const products=await productService.findProduct(condition)
        await Promise.all(products.map(async product=>{
            product.productImagePath=await productService.productPic(product.productImage)
        }))
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

module.exports=[listProducts]