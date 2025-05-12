import User from "../user/user.model.js"
import { hash, verify } from "argon2";


export const adminDefault = async () => {
    try {
      const admin = await User.findOne({ role: "ADMIN_ROLE" });
  
      if (!admin) {
        await User.create({
          name: "Admin",
          surname: "Admin",
          username: "Admin",
          email: "admin@gmail.com",
          password: await hash("Admin/14", 10),
          profilePicture: "default",
          phone: "12345678",
          role: "ADMIN_ROLE"
        });
      } else {
      }
    } catch (err) {
    }
  };

  export const MyUser = async (req, res) => {
  try {
    const userId = '681c43149883eb6f439544d5';

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: 'Usuario no encontrado',
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el usuario',
    });
  }
};