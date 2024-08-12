import { Router } from "express"
import controller from "../controllers/task.controller"

const router = Router()

router.get("", controller.find)
router.post("", controller.save)
router.put("/:taskId", controller.update)
router.delete("/:taskId", controller.remove)

export default router.use('/tasks', router)
