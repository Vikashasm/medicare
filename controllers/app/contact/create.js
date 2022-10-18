const contactService=require('../../service/contact.service')

const createproduct=async(req,res)=>{
    try {
        const contact=await contactService.createContact(req.body)
        let createdcontact = JSON.parse(JSON.stringify(contact));
        createdcontact.productImagePath =await contactService.contactImage(createdcontact.productImage);
        if(createdcontact){
            return res.status(201).json({
                success:true,
                message:'Product added successfully',
                product:createdcontact
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