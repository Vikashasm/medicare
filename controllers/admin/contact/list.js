const contactService=require('../../service/contact.service')

const listContacts=async(req,res)=>{
    try {
        const condition=[
            {
                $sort:{
                    createdAt:-1
                }
            }

        ]
        const contacts=await contactService.findContact(condition)
        if(contacts.length>0){
            await Promise.all(contacts.map(async contact=>{
                if(!contact.contactImage || contact.contactImage==null){
                    contact.contactImagePath=null
                }else{
                    contact.contactImagePath=await contactService.contactPic(contact.contactImage)
                }
            }))
            return res.status(201).json({
                success:true,
                message:'contacts List',
                contacts:contacts
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no user",
                contacts:contacts
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[listContacts]