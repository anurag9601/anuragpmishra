import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    userProfileImage: {
        type: String,
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages"
        }
    ]
}, { timestamps: true });

const UsersModel = mongoose.models.Users || mongoose.model("Users", UsersSchema);

export default UsersModel;