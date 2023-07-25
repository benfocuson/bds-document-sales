const express = require('express');
const router = express.Router();
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const configFirebase = require("../config/firebaseConfig")

// const router: Router = express.Router();

//Initialize a firebase application
initializeApp(configFirebase.firebase);



// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const uploadFirebase = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req) => {
  let result = {}
  
  const storageRef = ref(storage, `files/${req.file.originalname}`);

  await uploadBytes(storageRef, req.file.buffer).then(async (snapshot) => {
    // Lấy đường dẫn URL của tệp ảnh sau khi tải lên thành công
    const downloadURL = await getDownloadURL(snapshot.ref);

    // In ra URL của tệp ảnh
    console.log("Download URL:", downloadURL);

    result = {
      message: 'File uploaded to Firebase Storage',
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    }
  })
  return result
}



// router.post("/", uploadFirebase.single("filename"), async (req, res) => {
//     try {
//         const dateTime = giveCurrentDateTime();

//         const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//         // Create file metadata including the content type
//         const metadata = {
//             contentType: req.file.mimetype,
//         };

//         // Upload the file in the bucket storage
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//         //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

//         // Grab the public url
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         console.log('File successfully uploaded.');
//         return res.send({
//             message: 'file uploaded to firebase storage',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL
//         })
//     } catch (error) {
//         return res.status(400).send(error.message)
//     }
// });

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }



module.exports = {
  uploadFirebase,
  uploadFile
};