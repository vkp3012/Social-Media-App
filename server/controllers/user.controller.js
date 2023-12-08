import jsonWebToken from "jsonwebtoken"
import userModel from "../model/user.model.js"
import responseHandler from "../handlers/response.handler.js"

const signUp = async (req,res) => {
    try {
        const { name , email, phone, password } = req.body;

        // check user
        const checkUser = await userModel.findOne({email});
        if(checkUser) return responseHandler.bedRequest(res, "email already use");

        const user = new userModel();
        user.name = name 
        user.email = email
        user.phone = phone
        user.setPassword(password)

        await user.save();

        const token = jsonWebToken.sign(
            { data : user.id },
            process.env.TOKEN,
            { expiresIn : "24h" }
        )

        responseHandler.created(res,{
            token,
            ...user._doc,
            id : user.id 
        })


    } catch (error) {
        responseHandler.error(res)
    }
}