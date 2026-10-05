import path from 'path';
import cloudinary from "../middleware/cloudinary..middleware.js";

export const uploadToCloudinary = (name, media) => {
  const folder = `infinity/${name}`;
  return Promise.all(
    media.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: path.parse(file.originalname).name,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                secure_url: result.secure_url,
                resource_type: result.resource_type
              });
            }
          }
        );

        stream.end(file.buffer);
      });
    })
  );
};