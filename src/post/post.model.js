import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [999, "cannot exceed 999 characters"]
    },
    date: {
        type: Date,
        default: Date.now
    },      
    course: {
        type: String,
        required: [true, "Course is required"],
        enum: ["TALLER III", "TECNOLOGÍA III", "PRÁCTICA SUPERVISADA"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"]
    },
    postPicture: {
        type: String
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
});

export default model("Post", postSchema);
