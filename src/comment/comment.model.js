import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [50, "Name cannot exceed 50 characters"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
    maxLength: [50, "Surname cannot exceed 50 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxLength: [500, "Content cannot exceed 500 characters"]
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Associated post is required"]
  }
},
{
  versionKey: false,
  timestamps: true
});

export default model("Comment", commentSchema);   