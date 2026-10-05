import Account from "../models/Account.js";
import Album from "../models/Album.js";
import Media from "../models/Media.js";
import { uploadToCloudinary } from "../services/cloudinary.upload.js";
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

    const uploadedMedia = await uploadToCloudinary(album.name, media);

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
