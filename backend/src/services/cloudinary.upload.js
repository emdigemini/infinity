import path from 'path';
import cloudinary from "../middleware/cloudinary..middleware.js";

export const uploadToCloudinary = (userName, name, media) => {
  const safeName = name
  .normalize("NFKC")
  .replace(/[^\p{L}\p{N}\s_-]/gu, "")
  .trim()
  .replace(/\s+/g, "-");
  const safeUsername = userName
  .normalize("NFKD")
  .replace(/[^\w.-]/g, "_");
  const filename = `uploaded_by_${safeUsername}`

  const folder = `infinity/${safeName}`;
  return Promise.all(
    media.map((file, index) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: `${filename}_${index}_${Date.now()}`,
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