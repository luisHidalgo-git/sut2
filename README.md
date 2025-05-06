# Sistema de bolsa de trabajo para estudiantes

## Tecnologías utilizadas
- Autenticación con Jason Web Token
- Manejo de usuarios por estudiantes y empresas
- Implementación de archivos academicos
- Manejo de variables de entorno
- Express.js como backend
- React.js como frontend
- PostgreSQL como base de datos

## Configuración de proyecto local
### Creación y modificación de archivo .env server
```
DB_NAME=DB_NAME
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```
### Creación y modificacion de archivo .env client
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Ejecución de backend
```
cd server && npm install && npm run dev
```
### Ejecución de frontend
```
cd client && npm install && npm run dev
```