import Post from './post.model.js';
import Comment from '../comment/comment.model.js';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const createPost = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const { uid } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

    const data = req.body;
    const postPicture = req.file ? req.file.filename : null;

    const newPost = await Post.create({
      ...data,
      createdBy: uid,
      postPicture
    });

    await User.findByIdAndUpdate(uid, { $inc: { postsTotal: 1 } });

    res.status(201).json({
      message: "Post creado exitosamente",
      post: newPost
    });

  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({
      message: "Error al crear el post",
      error: error.message
    });
  }
};

  export const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
        const deletedPost = await Post.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
  
      if (!deletedPost) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      res.json({
        message: "Publicación desactivada correctamente",
        post: deletedPost
      });
    } catch (error) {
      console.error("Error al desactivar la publicación:", error);
      res.status(500).json({
        message: "Error al desactivar la publicación",
        error: error.message
      });
    }
  };

  export const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const postPicture = req.file ? req.file.filename : undefined;
  
      if (postPicture) {
        updates.postPicture = postPicture;
      }
  
      const updatedPost = await Post.findOneAndUpdate(
        { _id: id, status: true },
        updates,
        { new: true, runValidators: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Publicación no encontrada o desactivada" });
      }
  
      res.json({
        message: "Publicación actualizada correctamente",
        post: updatedPost
      });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      res.status(500).json({
        message: "Error al actualizar la publicación",
        error: error.message
      });
    }
  };

  export const listPostByComments = async (req, res) => {
    try {
      const posts = await Post.find({ status: true })
        .populate("createdBy", "name surname") 
        .lean(); 
  
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const comments = await Comment.find({ post: post._id }).lean();
          return {
            ...post,
            comments,
          };
        })
      );
  
      res.json({ posts: postsWithComments });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching posts with comments",
        error: error.message,
      });
    }
  };

  export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await Post.findById(id);
      if (!post || !post.status) {
        return res.status(404).json({ message: "Publicación no encontrada o inactiva." });
      }
  
      post.likes += 1;
      await post.save();
  
      await User.findByIdAndUpdate(post.createdBy, { $inc: { likesTotal: 1 } });
  
      res.status(200).json({
        message: "Like registrado exitosamente.",
        likes: post.likes
      });
    } catch (error) {
      console.error("Error al dar like:", error);
      res.status(500).json({
        message: "Error interno al dar like.",
        error: error.message
      });
    }
  };