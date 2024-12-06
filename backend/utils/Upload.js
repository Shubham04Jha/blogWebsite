import multer from 'multer';

// Use Multer's memory storage
const storage = multer.memoryStorage(); // File is stored in memory as a Buffer
const upload = multer({ storage });

export default upload;

// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// // Ensure the MongoDB URL is correct and make sure .env is set up correctly
// const URL = process.env.DB_URL;

// // Define storage configuration
// const storage = new GridFsStorage({
//   url: URL,
//   file: (req, file) => {
//     const match = ['image/jpeg', 'image/png'];
    
//     if (match.indexOf(file.mimetype) === -1) {
//     //   return `${Date.now()}-blog-${file.originalname}`;
//       return null;
//     }
    
//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`
//     };
//   }
// });

// // Set up multer with the defined storage
// const upload = multer({ storage });

// export default upload;



// import multer from 'multer'
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv'

// console.log("this is multer middleware")
// dotenv.config();
// URL = "mongodb+srv://Shubham:golB%401111@blog-app.cfjek.mongodb.net/?retryWrites=true&w=majority&appName=Blog-app/Blog-app"
// const Storage = new GridFsStorage({
//     // url: process.env.DB_URL,
//     url:URL,
//     file:(request,file)=>{
//         const match = ['image/jpeg', 'image/png']
        
//         if(match.indexOf(file.mimeType)===-1){
//             return `${Date.now()}-blog-${file.originalname}`;
//         }
//         return{
//             bucketName:"photos",
//             filename:`${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({Storage});