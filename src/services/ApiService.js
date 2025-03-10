import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: "G-XEDF368066",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функция для получения данных
const getData = async (id) => {
  try {
    if (id) {
      const docRef = doc(db, "vacancies", id); // id для конкретной вакансии
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Возвращаем данные вакансии с id
      } else {
        throw new Error("Вакансия не найдена");
      }
    } else {
      const vacanciesCollection = collection(db, "vacancies");
      const vacanciesSnapshot = await getDocs(vacanciesCollection);

      return vacanciesSnapshot.docs.map((doc) => ({
        id: doc.id, // Добавляем id
        ...doc.data(), // Добавляем данные вакансии
      }));
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

// Функция для добавления данных
const postData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "vacancies"), data);
    return docRef.id; // Возвращаем ID добавленной вакансии
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    throw error;
  }
};

// Функция для обновления данных
const updateData = async (id, data) => {
  try {
    const docRef = doc(db, "vacancies", id); // Ссылка на вакансию по ID
    await updateDoc(docRef, data); // Обновление данных
    return { id, ...data }; // Возвращаем обновленные данные
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    throw error;
  }
};

export { getData, postData, updateData };
