import {
  collection,
  getFirestore,
  doc,
  setDoc,
  query,
  getDocs,
  orderBy,
  where,
  deleteDoc,
} from 'firebase/firestore';

export const createCarInfo = async ({ carNumber, carFuel, carType, user }) => {
  try {
    const { uid } = user;
    const collectionRef = collection(getFirestore(), 'carinfo');
    const documentRef = doc(collectionRef);
    const id = documentRef.id;
    await setDoc(documentRef, {
      id,
      carNumber,
      carFuel,
      carType,
      user: { uid },
      createdTs: Date.now(),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('createCarInfo Error: ', e);
    throw new Error('차량정보등록 실패');
  }
};

export const getOption = (uid) => {
  const collectionRef = collection(getFirestore(), 'carinfo');

  if (uid) {
    return query(
      collectionRef,
      where('user.uid', '==', uid),
      orderBy('createdTs', 'desc')
    );
  } else {
    return query(collectionRef, orderBy('createdTs', 'desc'));
  }
};

export const getCarInfos = async (uid) => {
  const option = getOption(uid);
  const documentSnapshot = await getDocs(option);
  const list = documentSnapshot.docs.map((doc) => doc.data());
  return list;
};

export const deleteCarInfo = async (id) => {
  await deleteDoc(doc(getFirestore(), `carinfo/${id}`));
};

export const updateCarInfo = async (carinfo) => {
  try {
    await setDoc(doc(getFirestore(), `carinfo/${carinfo.id}`), carinfo);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('updateCarInfo error', e);
    throw new Error('차량정보수정 실패');
  }
};
