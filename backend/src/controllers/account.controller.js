import Account from "../models/Account.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createAccount = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) { 
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const isUsernameExists = await Account.findOne({ username });

    if (isUsernameExists) {
      return res.status(400).json({ message: 'This username already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Account.create({ name, username, password: hashedPassword });

    res.status(201).json({ message: "Account created successfuly." });
  } catch (err) {
    console.error('Error in fetchPlaylist controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) { 
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const isUserExists = await Account.findOne({ username })
      .populate("relationship");

    if (!isUserExists) {
      return res.status(404).json({ message: 'This user does not exist.' });
    }

    const isMatchPassword = await bcrypt.compare(password, isUserExists.password);

    if (!isMatchPassword) {
      return res.status(401).json({ message: 'Password incorrect.' });
    }

    const user = {
      id: isUserExists._id,
      name: isUserExists.name,
      username: isUserExists.username,
      relationship: {
        id: isUserExists?.relationship?._id,
        name: isUserExists?.relationship?.name,
        username: isUserExists?.relationship?.username
      }
    }

    const acc_id = jwt.sign(
      { id: user.id },
      process.env.JWT_SUPER_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('acc_id', acc_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'
        ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: `Successfuly login as ${user.name}`,
      user,
    })
    
  } catch (err) {
    console.error('Error in fetchPlaylist controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}