import {
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const databaseService = {
  /**
   * Add a new document with auto-generated ID
   */
  async add(collectionRef: CollectionReference, data: any) {
    return await addDoc(collectionRef, data);
  },

  /**
   * Set data to a document (create or overwrite)
   */
  async set(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
      console.log(
        `Document successfully written to ${collectionName}/${docId}`
      );
    } catch (error) {
      console.error(
        `Error writing document to ${collectionName}/${docId}:`,
        error
      );
      throw error;
    }
  },
  /**
   * Get a document by path
   */
  async get(docPath: string) {
    const docRef = doc(db, docPath);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  },

  /**
   * Update specific fields in a document
   */
  async update(docPath: string, data: any) {
    const docRef = doc(db, docPath);
    return await updateDoc(docRef, data);
  },

  /**
   * Delete a document
   */
  async remove(docPath: string) {
    const docRef = doc(db, docPath);
    return await deleteDoc(docRef);
  },
};

export default databaseService;
