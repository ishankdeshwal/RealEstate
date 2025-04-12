import asyncHandler from "express-async-handler";
import prisma from "../Config/PrismaConfig.js";
export const createResidency = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
    } = req.body.data;

    // Validate required fields
    if (!title || !description || !price || !address || !country || !city || !facilities || !image || !userEmail) {
      return res.status(400).json({
        message: "Missing required fields",
        details: {
          title: !title,
          description: !description,
          price: !price,
          address: !address,
          country: !country,
          city: !city,
          facilities: !facilities,
          image: !image,
          userEmail: !userEmail
        }
      });
    }

    // Validate price is a number
    if (typeof price !== 'number') {
      return res.status(400).json({
        message: "Price must be a number",
        received: typeof price
      });
    }

    // Validate facilities is an object
    if (typeof facilities !== 'object' || facilities === null) {
      return res.status(400).json({
        message: "Facilities must be an object",
        received: typeof facilities
      });
    }

    console.log("Creating residency with data:", {
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail
    });

    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: {
          connect: { email: userEmail },
        },
      }
    });

    res.status(201).json({
      message: "Residency Created Successfully",
      residency
    });

  } catch (err) {
    console.error("Error creating residency:", err);
    
    if (err.code === "P2002") {
      return res.status(400).json({
        message: "A residency with this address already exists for this user",
        code: err.code
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        message: "User not found",
        code: err.code
      });
    }

    return res.status(500).json({
      message: "Error creating residency",
      error: err.message,
      code: err.code
    });
  }
});

export const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    res.send(residencies)
})

export const getResidency=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try{
        const residency=await prisma.residency.findUnique({
            where:{
                id
            }
        })
        res.send(residency)
    }catch(err){
        throw new Error(err.message)
    }
})
