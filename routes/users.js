const router = require('express').Router();

const {
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserMe,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserValidation, getUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
