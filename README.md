# TecBlog - Backend

Este es el backend del proyecto **TecBlog**, desarrollado con Node.js, Express y MongoDB. Administra las publicaciones de los cursos y los comentarios públicos.

El objetivo de la api es que sea eficiente y 100 porciento funcional.

## 📚 Funcionalidades

- Gestión de publicaciones (crear, actualizar, eliminar, listar).
- Comentarios públicos sin necesidad de autenticación.
- Sistema de "like" para publicaciones.
- Validaciones de integridad en publicaciones y comentarios.
- Almacenamiento en MongoDB.

## 👤 Credenciales de administradores por defecto

```json
{
  "email": "sperez@gmail.com",
  "password": "Admin/14"
}
```

```json
{
  "email": "admin@gmail.com",
  "password": "Admin/14"
}
```

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

## 🔧 Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/sperez-2020493/TecBlog_Api.git
```

2. Abre una terminal en la carpeta del proyecto y instala las dependencias:

```bash
npm i
```

3. Inicia el servidor:

```bash
npm run dev
```

> Asegúrate de tener un archivo `.env` con las variables necesarias como la URI de MongoDB.

## 🧑🏽 Desarrollador del proyecto


**Desarrollador:** Samuel Alexander Perez Cap - 2020493 - IN6BM

---
