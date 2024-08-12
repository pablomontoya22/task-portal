import repository from "../repositories/user.respository"
import { Request, Response } from "express"
import { responseOk, responseMsgOk, responseError } from "../utilities/utils"
import { User } from "../entities/user.entity"

const find = async (req: Request, res: Response) => {
    try {
        res.json(responseOk(await repository.find(req.params.email)))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const save = async (req: Request, res: Response) => {
    try {
        res.json(responseOk(await repository.save(new User(req.body))))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const update = async (req: Request, res: Response) => {
    try {
        await repository.update({ ...req.body, id: req.params.userId })
        res.json(responseMsgOk("Successful updated"))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        await repository.remove(req.params.userId)
        res.json(responseMsgOk("Successful removed"))
    } catch (e: any) {
        res.json(responseError(e))
    }
}

export default { find, save, update, remove }