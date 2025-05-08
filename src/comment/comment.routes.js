import { Router } from "express";
import { createComment, commentsByPost } from "./comment.controller.js";
import { createCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

router.post("/create", createCommentValidator, createComment);

router.get("/post/:postId", commentsByPost);

export default router;