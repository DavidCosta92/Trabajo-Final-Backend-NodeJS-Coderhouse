import { createTransport } from "nodemailer"
import { winstonLogger } from "./logger.js"
import { EMAIL_CONFIG } from "../config/config.js"


class EmailService {
    #nodeMailer

    constructor(config){
        this.#nodeMailer = createTransport(config)
    }
    async sendTextEmail (to , msj , subject = "TP Final Coderhouse Nodejs"){
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : to ,
            subject : subject , // se supone que si no envio subject, ira uno por defecto
            text : msj             
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            console.log("En teoria envie email =>" , sentEmail)
            winstonLogger.info("SUPUESTAMENTE ENVIE MAIL => ", sentEmail)
            return sentEmail
        } catch (error) {
            winstonLogger.warning("Error en envio mail => ", error)
            throw error
        }

    }
    async sendHtmlEmail (to , html , subject = "TP Final Coderhouse Nodejs"){
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : to ,
            subject : subject , // se supone que si no envio subject, ira uno por defecto
            html : html             
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            console.log("En teoria envie email =>" , sentEmail)
            winstonLogger.info("SUPUESTAMENTE ENVIE MAIL => ", sentEmail)
            return sentEmail
        } catch (error) {
            winstonLogger.warn("Error en envio mail => ", error)
            throw error
        }

    }
}
export const emailService = new EmailService(EMAIL_CONFIG)