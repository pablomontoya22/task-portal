import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, UpdateData, query, where } from "firebase/firestore"
import firebaseApp from "../config/firebase"
import { plainObj } from "../utilities/utils"
import { User } from "../entities/user.entity"

const db = getFirestore(firebaseApp)
const COLLECTION_NAME = "users"

const find = async (email: string): Promise<User[]> => {
    const res = email && email !== 'users'
        ? await getDocs(query(collection(db, COLLECTION_NAME), where("email", "==", email)))
        : await getDocs(collection(db, COLLECTION_NAME))
    return res.docs.map((a: any) => ({ ...a.data(), id: a.id }))
}

const save = async (user: User): Promise<User> => {
    const ref = await addDoc(collection(db, COLLECTION_NAME), plainObj(user))
    return { ...user, id: ref.id }
}

const update = async (user: User) =>
    await updateDoc(doc(db, COLLECTION_NAME, user.id), user as UpdateData<User>)

const remove = async (id: string) => await deleteDoc(doc(db, COLLECTION_NAME, id))

export default { save, update, find, remove }