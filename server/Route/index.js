import express from "express"
import UserRoute from "./user.route.js"

const router = express.Router()

router.use("/user",UserRoute)

export default router