import mongoose from "mongoose";


const MessagesSchema = new mongoose.Schema({
    userData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const MessagesModel = mongoose.models.Messages || mongoose.model("Messages", MessagesSchema);

export default MessagesModel;