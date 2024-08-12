import repository from "../repositories/task.repository"
import { Request, Response } from "express"
import { responseOk, responseMsgOk, responseError } from "../utilities/utils"
import { Task } from "../entities/task.entity"

const find = async (_req: Request, res: Response) => {
    try {
        res.json(responseOk(await repository.find()))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const save = async (req: Request, res: Response) => {
    try {
        res.json(responseOk(await repository.save(new Task(req.body))))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const update = async (req: Request, res: Response) => {
    try {
        await repository.update({ ...req.body, id: req.params.taskId })
        res.json(responseMsgOk("Successful updated"))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        await repository.remove(req.params.taskId)
        res.json(responseMsgOk("Successful removed"))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

export default { find, save, update, remove }