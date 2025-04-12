import express from 'express'
import { createResidency, getResidency } from '../Controllers/ResidencyController.js'
import {getAllResidencies} from '../Controllers/ResidencyController.js'
import jwtCheck from '../Config/auth0config.js'
const router=express.Router()

router.post("/create",jwtCheck,createResidency)
router.get("/all",getAllResidencies)
router.get("/:id",getResidency)
export {router as ResidencyRoute}