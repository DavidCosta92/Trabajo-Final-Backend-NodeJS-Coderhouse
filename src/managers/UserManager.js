import { userModel } from "../../Dao/DBaaS/models/userModel.js";
       
export class UserManager{

    // revisar en user.controller.js los metodos que deberian estar aqui... se supone que en el controller no deberian haber llamados directos al modelo ( no debe haber cosas como estas => userModel.create(user))
    async createUser(user){ 
        return await userModel.create(user)
    }   
    // async postUser(user){    }   
    // async postUser(user){    }   
    // async postUser(user){    }   

    async searchByEmail(email){
        const user = await userModel.findOne({ email: email }).lean() /// coorroborar si seria necesario?
        return user;        
    }    
}       
export const userManager = new UserManager()