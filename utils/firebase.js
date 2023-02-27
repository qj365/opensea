import { initializeApp, deleteApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCw1-0UvC1M0PCu2yPsfB5GN9rNNJEQwHQ',
    authDomain: 'opensea-33569.firebaseapp.com',
    projectId: 'opensea-33569',
    storageBucket: 'opensea-33569.appspot.com',
    messagingSenderId: '442425008466',
    appId: '1:442425008466:web:ab11a50da2507743669a8b',
    measurementId: 'G-9YT4XRX0DV',
};

export default async function uploadImage(file, path = 'images') {
    //check file emmpty first
    if (!file) return null;
    getApps().length === 0 && initializeApp(firebaseConfig);
    const storage = getStorage();
    const fileName =
        Math.floor(Math.random() * Date.now()) +
        '.' +
        file.name.split('.')?.pop()?.toLowerCase();
    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}
