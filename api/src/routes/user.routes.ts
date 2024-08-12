import { Router } from "express"
import controller from "../controllers/user.controller"

const router = Router()

router.get("/:email", controller.find)
router.post("", controller.save)
router.put("/:userId", controller.update)
router.delete("/:userId", controller.remove)

export default router.use('/users', router)
