import  asyncHandler from 'express-async-handler'
import prisma from '../Config/PrismaConfig.js'
export const createUser=asyncHandler(async(req,res)=>{
    let{email}=req.body
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });
    if(!userExists){
        const user=await prisma.user.create({data:{email}})
        res.send({
            Message:"User Created",
            user:user
        })
    }else{
        res.status(201).send({ message: "User Already Registered" });
    }
})

export const bookVisit=asyncHandler(async(req,res)=>{
    const {email,date}=req.body;
const {id}=req.params;
try{
    const alreadyBooked=await prisma.user.findUnique({
        where:{
            email:email
        },
        select:{
            bookedVisits:true
        }
       
    })
    if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"Visit Already Booked"})
    }else{
        await prisma.user.update({
            where:{
                email:email
            },
            data:{
                bookedVisits:{
                    push:{id,date}
                }
            }
        })
        res.send({message:"Visit Booked"})
    }
   
}catch(err){
    throw new Error(err.message)
}
})

export const getAllVisits=asyncHandler(async(req,res)=>{
    const{email}=req.body
    
    if (!email) {
        console.error("No email provided in getAllVisits request");
        return res.status(400).json({ 
            message: "Email is required", 
            bookedVisits: [] 
        });
    }

    try {
        console.log("Fetching visits for email:", email);
        
        const visits = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                bookedVisits: true
            }
        });
        
        console.log("Prisma response:", visits);
        
        if (!visits) {
            console.log("No user found for email:", email);
            return res.status(404).json({ 
                message: "User not found", 
                bookedVisits: [] 
            });
        }
        
        const bookedVisits = Array.isArray(visits.bookedVisits) ? visits.bookedVisits : [];
        
        console.log("Returning bookedVisits:", bookedVisits);
        return res.status(200).json({ bookedVisits });
        
    } catch (error) {
        console.error("Error in getAllVisits:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                message: "User not found", 
                bookedVisits: [] 
            });
        }
        
        return res.status(500).json({ 
            message: "Error fetching bookings", 
            bookedVisits: [] 
        });
    }
})

export const cancelBooking=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const {id}=req.params
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:email
            },
            select:{
                bookedVisits:true
            }
        })
        const idx=user.bookedVisits.findIndex((visit)=>visit.id===id)
        if(idx===-1){
            res.status(404).json({message:"Booking Not Found"})
        }else{
            user.bookedVisits.splice(idx,1);
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
        }
        res.json({message:"Booking Cancelled"})
    }catch(err){
        throw new Error(err.message)
    }
})

export const toFav=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const {rid}=req.params
    if (!rid) {
        return res.status(400).json({ message: "Residency ID is required" });
    }
    try{
        const user=await prisma.user.findUnique({
            where:{email}
        })
        if(user.favResidenciesiD.includes(rid)){
            const updatedUser=await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesiD:{
                        set:user.favResidenciesiD.filter((id)=>id!==rid)
                    }
                }
            });
            res.status(200).json({ message: "Residency Removed from Favourites", user: updatedUser })
        }else{
            const updatedUser=await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesiD:{
                        push:rid
                    }
                }
            })
            res.json({message:"Residency Added to Favourites",user:updatedUser})
        }
    }catch(err){
        throw new Error(err.message)
    }
})
export const getAllFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const favRes = await prisma.user.findUnique({
            where: { email },
            select: {
                favResidenciesiD: true
            }
        });
        
        console.log("getAllFav response:", favRes);
        
        if (!favRes) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(favRes);
    } catch (error) {
        console.error("Error in getAllFav:", error);
        res.status(400).json({ message: error.message });
    }
});