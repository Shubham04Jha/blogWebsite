import Photo from '../Model/photos.js';


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
        // const imgUrl = `${url}/file/${savedPhoto._id}`; // cannot have this url stuff here as maybe the backend can move.
        const imgUrl = `/file/${savedPhoto._id}`;

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
