import { AuthenticationError } from "../../entities/error/authenticationError.js"
import { sessionService } from "../../services/sessionService.js"


export async function postSession(req, res, next) {  
    try {
         const userBD = await sessionService.checkUserAndPassword(req.body.email , req.body.password)

         req.session.user = {
             first_name: userBD.first_name,
             last_name: userBD.last_name,
             email: userBD.email,
             age: userBD.age,
             cart : userBD.cart,
             role : userBD.role
         }
         res.status(201).json(req.session.user)
        
    } catch (error) {
        next(error)
    }
  }
  
export async function postSessionTokenCookie(req, res, next) {  
    try {
        const token = await sessionService.getSessionToken(req.body.email , req.body.password)
         res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
         res.status(201).json(req.session.user)
         next()
    } catch (error) {
        next(new AuthenticationError("Error de logueo, revisa las credenciales"))
    }
}

export async function deleteSession (req, res, next){    
    /* CUANDO ESTANDO REGISTRADO, INICIO SESION SOLAMENTE*/
    if(req.signedCookies?.authToken!==undefined) {
        res.clearCookie('authToken')        
        res.sendStatus(200)
    }
    if(req.session?.user !==undefined) {
        req.session.destroy()        
        res.sendStatus(200)
    }
    /* CUANDO ME REGISTRO, Y QUEDO LOGUEADO -- REGISTRO Y LOGOUT DE GITHUB*/
    if(req.session?.passport!==undefined) {
        req.session.destroy()        
        res.sendStatus(200)
    }
    res.sendStatus(200)
}
export async function localRegister (req, res, next){
    req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        cart : req.body.cart,
        role : req.body.role
    }
    res.redirect('/api/users/products') 
}
export async function sendStatus (req, res, next){
    res.status(201).json(req.session.user)
}