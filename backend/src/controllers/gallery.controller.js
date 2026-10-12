import cloudinary from "../middleware/cloudinary..middleware.js";
import Account from "../models/Account.js";
import Album from "../models/Album.js";
import Media from "../models/Media.js";
import { getPublicIdFromUrl, uploadToCloudinary } from "../services/cloudinary.upload.js";
import mongoose from "mongoose";

export const createAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const media = req.files;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: 'Name is required to create album.' })
    } else if (!Array.isArray(media) || media.length === 0) {
      return res.status(400).json({ message: 'Upload at least one or more media to create album.' })
    }

    const user = await Account.findById(userId);
    const userName = user.name;

    const mediaUrls = await uploadToCloudinary(userName, name, media);

    const album = await Album.create({ createdBy: userId, name, description });
    const albumId = album._id;

    const mediaDocs = mediaUrls.map(m => ({
      albumId,
      uploadedBy: userId,
      url: m.secure_url,
      type: m.resource_type
    }));

    const mediaRes = await Media.insertMany(mediaDocs);

    const albums = {
      _id: album._id,
      description: album.description,
      cover: album.cover,
      mediaCount: mediaDocs.length,
      media: mediaRes,
    }
    
    res.status(200).json({
      message: `${album.name} successfully created.`,
      albums
    });
  } catch (err) {
    console.log("Error in createAlbum controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, cover } = req.body;
    const userId = req.user.id;

    const user = await Account.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found." });

    if (!name?.trim())
      return res.status(400).json({ message: "Album name cannot be empty." });

    const album = await Album.findOne({ _id: id  });

    if (!album)
      return res.status(404).json({ message: "Album not found." });

    const updatedDetails = {
      name: name.trim(),
    };

    if (description !== undefined) {
      updatedDetails.description = description;
    }

    if (req.file) {
      const result = await uploadToCloudinary(
        user.name,
        `cover-for-${name.trim()}`,
        [req.file]
      );

      updatedDetails.cover = result[0].secure_url;
    }

    if (cover === 'remove') {
      updatedDetails.cover = ''
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { $set: updatedDetails },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Album updated successfully.",
      album: updatedAlbum,
    });
  } catch (err) {
    console.error("Error in updateAlbum controller:", err);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const fetchAlbums = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Account.findById(userId)
      .populate("relationship");
    const partnerId = user.relationship?._id ?? null;
    const creatorIds = [ userId, partnerId ]
      .filter(Boolean)
      .map(id => new mongoose.Types.ObjectId(id));

    const albums = await Album.aggregate([
      {
        $match: {
          createdBy: {
            $in: creatorIds
          }
        }
      },
      {
        $lookup: {
          from: "media",
          let: { albumId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$albumId", "$$albumId"]
                }
              }
            },
            {
              $sort: {
                createdAt: -1
              }
            }
          ],
          as: "media"
        }
      },
      {
        $addFields: {
          mediaCount: { $size: "$media" }
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ]);

    if (albums.length === 0)
      return res.status(404).json({ message: 'No album available, create one to start.' });

    res.status(200).json({ albums });
  } catch (err) {
    console.log("Error in fetchAlbums controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const addMedia = async (req, res) => {
  try {
    const { albumId } = req.body;
    const media = req.files;
    const userId = req.user.id;

    if (!albumId) {
      return res.status(400).json({
        message: "Album ID is required.",
      });
    }

    if (!media || media.length === 0) {
      return res.status(400).json({
        message: "Please select at least one media file.",
      });
    }

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({
        message: "Album not found.",
      });
    }
    
    const user = await Account.findById(userId);
    const userName = user.name;

    const uploadedMedia = await uploadToCloudinary(userName, album.name, media);

    const newMedia = await Media.insertMany(
      uploadedMedia.map((item) => ({
        albumId,
        uploadedBy: userId,
        url: item.secure_url,
        caption: "",
        type: item.resource_type,
      }))
    );

    return res.status(201).json({
      message: "Media added successfully.",
      media: newMedia,
    });

  } catch (err) {
    console.log("Error in addMedia controller", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id)
      return res.status(400).json({ message: 'Failted to delete. No selected media.' });

    const media = await Media.findByIdAndDelete(id);

    if (!media)
      return res.status(404).json({
        message: 'Media not found. Failed to delete media.'
      });
    
    // const publicId = getPublicIdFromUrl(media.url);

    // const result = await cloudinary.uploader.destroy(
    //   publicId,
    //   { resource_type: media.type }
    // );

    // if (result.result !== "ok" && result.result !== "not found") {
    //   console.error("Failed to delete media from Cloudinary.");
    // }

    res.status(200).json({ message: 'Media deleted successfully.' });
  } catch (err) {
    console.log("Error in deleteMedia controller", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({
        message: "Album not found.",
      });
    }
    await Media.deleteMany({ albumId: id });

    res.status(200).json({ message: "Album and its media deleted successfully" });
  } catch (err) {
    console.log("Error in deleteAlbum controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
