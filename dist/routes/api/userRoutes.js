// UPDATE THIS CODE!!!!!!
// 
// 
import { Router } from 'express';
const router = Router();
import { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userId
// MAY NEED TO UPDATE THIS ROUTE NAME
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// may want to add route for removing a user's associated thoughts when they are deleted
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
export { router as userRouter };
