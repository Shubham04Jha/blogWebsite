import Photo from '../Model/photos.js';

const url = `http://localhost:5000`;

export const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ msg: 'File not found' });
    }

    try {
        const photo = new Photo({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
        });
        //validate
        await photo.validate();
        // Save the photo to the database
        const savedPhoto = await photo.save();

        // Generate the file's public URL
        const imgUrl = `${url}/file/${savedPhoto._id}`;

        return res.status(200).json({
            msg: 'File uploaded successfully',
            fileUrl: imgUrl, 
        });
    } catch (error) {
        // console.error('Error uploading file:', error);
        return res.status(500).json({ msg: 'Error uploading file' });
    }
};

export const getImage = async (req, res) => {
    try {
        // Find the photo by ID
        const photo = await Photo.findById(req.params.id); // route involves id hence

        if (!photo) {
            return res.status(404).json({ msg: 'File not found' });
        }

        // Send the file
        res.set('Content-Type', photo.contentType);
        res.send(photo.data);
    } catch (error) {
        // console.error('Error retrieving file:', error);
        return res.status(500).json({ msg: 'Error retrieving file' });
    }
}; 

export const deleteImage  = async(req,res)=>{
    try{
        await Photo.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:'Deleted messgae successfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

// good stuff but for application code consistency lets just use the model format.
//import mongoose from 'mongoose';

// const url = `http://localhost:5000`;

// export const uploadImage = async (request, response) => {
//     if (!request.file) {
//         return response.status(404).json({ msg: 'file not found' });
//     }

//     try {
//         // Get the MongoDB collection (reuse the existing connection)
//         const bucket = mongoose.connection.db.collection('photos'); // Store files in 'photos' collection

//         // Prepare the file document
//         const fileData = {
//             filename: request.file.originalname, // Original file name
//             contentType: request.file.mimetype, // MIME type (e.g., 'image/png')
//             data: request.file.buffer, // Binary data from the buffer
//             uploadDate: new Date(), // Timestamp of upload
//         };

//         // Insert the file into MongoDB
//         const result = await bucket.insertOne(fileData);

//         // Generate the file's public URL using its unique ID
//         const imgUrl = `${url}/file/${result.insertedId}`;

//         return response.status(200).json({
//             msg: 'File uploaded successfully',
//             fileUrl: imgUrl,
//         });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         return response.status(500).json({ msg: 'Error uploading file' });
//     }
// };









// const url = `http://localhost:5000`;
// export const uploadImage = (request,response)=>{
//     if(!request.file){
//         return response.status(404).json({msg:'file not found'});
//     }
//     // middle ware didn't uploaded it. It is stored in request.file.buffer
//     console.log(request.file);
//     const imgUrl = `${url}/file/${request.file.filename}`;
    
//     return response.status(200).json(imgUrl);
// }