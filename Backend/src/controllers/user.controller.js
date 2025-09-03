
import User from './../models/User.js';
import FriendRequest from './../models/FriendRequest.js';


export async function getRecommendedUsers(req,res){
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedusers = await User.find({
            $and:[
                {_id:{$ne : currentUserId}},
                {_id:{$nin : currentUser.friends}},
                {isOnBoarded: true}
            ]
        })

        res.status(200).json({success:true, recommendedusers})

    } catch (error) {
        console.log("error in get recommended users controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export async function getMyFriends(req, res){
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.log("error in get friends controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;
    
        // prevent sending req to yourself
        if (myId === recipientId) {
          return res.status(400).json({ message: "You can't send friend request to yourself" });
        }
    
        const recipient = await User.findById(recipientId);
        if (!recipient) {
          return res.status(404).json({ message: "Recipient not found" });
        }
    
        // check if user is already friends
        if (recipient.friends.includes(myId)) {
          return res.status(400).json({ message: "You are already friends with this user" });
        }
    
        // check if a req already exists
        const existingRequest = await FriendRequest.findOne({
          $or: [
            { sender: myId, recipient: recipientId },
            { sender: recipientId, recipient: myId },
          ],
        });
    
        if (existingRequest) {
          return res
            .status(400)
            .json({ message: "A friend request already exists between you and this user" });
        }
    
        const friendRequest = await FriendRequest.create({
          sender: myId,
          recipient: recipientId,
        });
    
        res.status(201).json(friendRequest);
      } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export async function acceptFriendRequest(req, res){
    try {
        const {id:requestId} = req.params

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({message:"Friend request not found"});
        }

        // verify if the current user is the recipient of the request
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message:"You are not authorized to accept this friend request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save(); 
        
        // add each other as friends
        // $addToSet is used to avoid duplicate entries
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipient}
        })
        
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender}
        })

        res.status(200).json({message:"Friend request accepted successfully"});
    } catch (error) {
        console.log("error in accept friend request controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export async function getFriendRequests(req, res){
    try{
        const userId = req.user.id;
        const incomingRequest = await FriendRequest.find({
            recipient:userId,
            status:"pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedRequests = await FriendRequest.find({
            sender:userId,
            status:"accepted"
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({
            incomingRequests: incomingRequest,
            acceptedRequests: acceptedRequests
        });

    }catch (error) {
        console.log("error in get friend requests controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export async function getOutgoingFriendRequests(req, res){
    try {
        const userId = req.user.id;

        const outgoingRequests = await FriendRequest.find({
            sender:userId,
            status:"pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("error in get outgoing friend requests controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}