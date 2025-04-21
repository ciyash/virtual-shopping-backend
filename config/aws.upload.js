import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/aws.js'; 

const getUpload = (folderName = 'general') => {
  return multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
      key: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, `${folderName}/${filename}`);
      }
    })
  });
};

export default getUpload;
