import { Router } from 'express';
import {authorize} from "./../middlewares/auth.middleware.js"
import { getMyFriends, getRecommendedUsers ,sendFriendRequest, acceptFriendRequest ,getFriendRequests ,getOutgoingFriendRequests } from '../controllers/user.controller.js';

const router = Router();

router.use(authorize);

router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);

router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest); 

router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);


export default router;