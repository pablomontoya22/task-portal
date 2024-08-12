import { Timestamp } from "firebase/firestore"

export class Task {
    id: string = ''
    title: string = ''
    desc: string = ''
    created: Timestamp
    state: string = ''

    public constructor(obj: any) {
        if (!obj.title) {
            throw new Error("El campo 'title' es obligatorio")
        }
        if (!obj.desc) {
            throw new Error("El campo 'desc' es obligatorio")
        }
        if (!obj.state) {
            throw new Error("El campo 'state' es obligatorio")
        }

        this.title = obj.title
        this.desc = obj.desc
        this.state = obj.state
        this.created = Timestamp.fromDate(new Date())
    }
}