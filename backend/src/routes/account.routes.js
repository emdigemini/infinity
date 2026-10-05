import express from 'express';
import { createAccount, loginAccount } from '../controllers/account.controller.js';
import { authentication } from '../middleware/auth.middleware.js';
import Account from '../models/Account.js';

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login-user", loginAccount);
router.get('/check-auth', authentication, async (req, res) => {
  const userId = req.user.id;

  const isUserExists = await Account.findById(userId)
    .populate("relationship").select("-password");
  if (!isUserExists) {
    return res.status(404).json({ message: 'User does not exist.' });
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

  res.status(200).json({ user })
});

export default router