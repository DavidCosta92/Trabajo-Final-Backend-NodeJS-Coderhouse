import { ticketDAOMongo } from "../managers/mongoose/ticketDAOMongoose.js"
import { TicketErrorWEB } from "../models/errors/validations.errors.js"

class TicketRepository{
    ticketDao
    constructor (ticketDao){
        this.ticketDao = ticketDao
    }       
    async createTicket (acceptedProds , rejectedProds , amount , purchaser, req, res, next){  
        try {
            return await this.ticketDao.createTicket(acceptedProds , rejectedProds , amount , purchaser, req, res, next)
        } catch (error) {
            throw new TicketErrorWEB(error)
        }          
    }    

}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export const ticketRepository = new TicketRepository(ticketDAOMongo)