import express from 'express';
const router=express.Router()
import { bookVisit, cancelBooking, createUser, getAllFav, getAllVisits, toFav } from '../Controllers/UserController.js'
import jwtCheck from '../Config/auth0config.js';
router.post('/register',jwtCheck,createUser)
router.post('/bookVisit/:id',jwtCheck,bookVisit)
router.post('/getAllVisits',jwtCheck,getAllVisits);
router.post('/removeBooking/:id',jwtCheck,cancelBooking)
router.post('/tofav/:rid',jwtCheck,toFav);
router.post('/allFav',jwtCheck,getAllFav);
export {router as userRoute}
