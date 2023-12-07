import jsonWebToken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import userModel from "../model/user.model.js"

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"]
        if(bearerHeader){
            const token = bearerHeader.split(" ")[1]
            return jsonWebToken(token,process.env.TOKEN)
        }
        return false
    } catch (error) {
        return false
    }
}

const auth = async (req,res,next) => {
    const tokenDecode = tokenDecode(req);
    if(!tokenDecode) return responseHandler.unauthorize(res)
    const user = await userModel.findById(tokenDecode.data);
    if(!user) return responseHandler.unauthorize(res);
    req.user = user

    next()
}

export default { auth, tokenDecode}