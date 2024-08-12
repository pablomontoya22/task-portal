import { Timestamp } from "firebase/firestore"

export class User {
    id: string = ''
    email: string = ''
    fullName: string = ''
    created: Timestamp

    public constructor(obj: any) {
        if (!obj.email) {
            throw new Error("El campo 'email' es obligatorio")
        }
        if (!obj.fullName) {
            throw new Error("El campo 'fullName' es obligatorio")
        }

        this.email = obj.email
        this.fullName = obj.fullName
        this.created = Timestamp.fromDate(new Date())
    }
}