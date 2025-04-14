import {auth} from 'express-oauth2-jwt-bearer'
const jwtCheck=auth({
    audience:"https://real-estate-t82o.vercel.app",
    issuerBaseURL:"https://dev-c36q3wiqqre4xdtr.us.auth0.com/",
    tokenSigningAlg:"RS256"
})
export default jwtCheck