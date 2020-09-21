import jwt from 'jsonwebtoken'
import User from '../models/User'

import authConfig from '../../config/auth'

class SessionController {
    async store(req,res){
        const {email, senha } = req.body;

     // Verificando email
     const user = await User.findOne({ where: {email:email}})
     if(!user){
         return res.status(401).json({ error: 'Usuarario não existe.'});
     }   
     // Verificar senha
     if(!(await user.checkPassword(senha))){
        return res.status(401).json({ error: 'Senha incorreta.'});

     }
     
     const {id, nome} = user;

     return res.json({
         user: {
             id,
             nome,
             email
         },
         token: jwt.sign({ id }, authConfig.secret, {
             expiresIn: authConfig.expiresIn,
         })
     })
    
    }

}

export default new SessionController();