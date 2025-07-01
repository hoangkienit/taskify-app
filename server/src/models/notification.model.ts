import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  type: { 
    type: String, enum: ["friend_request", "friend_accept", "system", "news", "discount"], 
    required: true 
},
  content: { 
    type: String, 
    required: true 
},
  link: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
