const contactService=require('../../service/contact.service')
const mongoose=require('mongoose')

const contactAction=async(req,res)=>{
    try {
        const contact=await contactService.updateContact({_id:req.params.contactId},{actionTaken:true})
        if(contact){
            return res.status(201).json({
                success:true,
                message:'action taken successfully',
                contact:contact
            })
        }else{
            return res.status(400).json({
                success:true,
                message:"fail to take action",
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[contactAction]