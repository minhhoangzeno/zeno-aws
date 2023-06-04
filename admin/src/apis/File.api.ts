import db from "../helper/firebaseInit.helper";
import { updateDoc, doc, deleteDoc, collection, addDoc } from "firebase/firestore";
import { IFile } from "../interface/File.interface";

export class FileAPI {
    static create = async (record: IFile) => {
        const dbRef = collection(db, "File");
        const data = {
            name: record.name,
        };
        return await addDoc(dbRef, data);
    };

    static update = async (id: string, data: IFile) => {
        return await updateDoc(doc(db, "File", id), {
            name: data.name,
        });
    };

    static delete = async (id: string) => {
        return await deleteDoc(doc(db, "File", id)).then(() => {});
    };

    
}
