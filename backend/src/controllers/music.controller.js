import { searchSpotify } from "../services/spotify.service.js";

export const searchMusic = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: 'Type something to search' });
    }

    const result = await searchSpotify(search);
    res.status(200).json({ result });
  } catch (err) {
    console.error('Error in searchMusic controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}