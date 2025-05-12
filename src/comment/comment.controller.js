import Comment from './comment.model.js';
import Post from '../post/post.model.js';

export const createComment = async (req, res) => {
    try {
      const { name, surname, content, post } = req.body;
  
      const existingPost = await Post.findById(post);
      if (!existingPost) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      const comment = await Comment.create({
        name,
        surname,
        content,
        post
      });
  
      res.status(201).json({
        message: "Comentario creado exitosamente",
        comment
      });
    } catch (error) {
      res.status(500).json({
        message: "No se pudo crear el comentario",
        error: error.message
      });
    }
  };

  export const commentsByPost = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const comments = await Comment.find({ post: postId });
  
      if (!comments.length) {
        return res.status(404).json({ message: "No hay comentarios para esta publicación." });
      }
  
      res.json({ comments });
    } catch (error) {
      res.status(500).json({
        message: "Error al recuperar comentarios",
        error: error.message
      });
    }
  };

  