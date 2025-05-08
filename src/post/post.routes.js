import { Router } from "express"
import { createPost, updatePost, deletePost, listPostByComments, likePost } from "./post.controller.js"
import { updatePostValidator, createPostValidator, deleteValidator } from "../middlewares/post-validators.js"
import { uploadPostPicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"


const router = Router()

router.post("/create", uploadPostPicture.single("postPicture"), createPostValidator, deleteFileOnError, createPost)

router.put("/edit/:id", uploadPostPicture.single("postPicture"), updatePostValidator, deleteFileOnError, updatePost)

router.delete("/delete/:id", deleteValidator, deletePost)

router.get("/list", listPostByComments)

router.post("/like/:id", likePost)

export default router