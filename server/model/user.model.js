import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        Selected : false
    },
    phoneNumber : {
        type : Number,
        require : true
    },
    salt : {
        type : String,
        require : true,
        Selected : false
    }
},userModel);

userModel.model.setPassword = function(password){
    this.salt = crypto.randomBytes(18).toString("hex")
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha12"
    ).toString('hex')
}

userModel.model.validPassword = function(password){
    this.hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha12"
    ).toString("hex")

    return password = this.hash;
}

const userModel = mongoose.model("user",userSchema)
export default userModel