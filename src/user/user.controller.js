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