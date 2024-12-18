import multer from 'multer';

// Use Multer's memory storage
const storage = multer.memoryStorage(); // File is stored in memory as a Buffer
const upload = multer({ storage });

export default upload;
