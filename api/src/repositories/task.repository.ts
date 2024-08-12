import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, UpdateData } from "firebase/firestore"
import firebaseApp from "../config/firebase"
import { plainObj } from "../utilities/utils"
import { Task } from "../entities/task.entity"

const db = getFirestore(firebaseApp)
const COLLECTION_NAME = "tasks"

const find = async (): Promise<Task[]> => {
    const res = await getDocs(collection(db, COLLECTION_NAME))
    return res.docs.map((a: any) => ({ ...a.data(), id: a.id }))
}

const save = async (task: Task): Promise<Task> => {
    const ref = await addDoc(collection(db, COLLECTION_NAME), plainObj(task))
    return { ...task, id: ref.id }
}

const update = async (task: Task) =>
    await updateDoc(doc(db, COLLECTION_NAME, task.id), task as UpdateData<Task>)

const remove = async (id: string) => await deleteDoc(doc(db, COLLECTION_NAME, id))

export default { save, update, find, remove }
