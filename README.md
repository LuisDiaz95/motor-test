# motor-test

Este proyecto publica un anuncio en [seminuevos.com](https://seminuevos.com) usando una API con Puppeteer, y muestra el resultado en una interfaz web con React y Material-UI.

## Estructura del proyecto
```
motor-test/
├── api/ # Backend con Node.js, Express y Puppeteer
├── frontend/ # Frontend con React y Material-UI
```
### 1. Clona este repositorio

```
git clone https://github.com/LuisDiaz95/motor-test.git
cd motor-test
```

### 2. Configura las variables de entorno
Crea un archivo .env dentro de la carpeta /api:

Edita .env con credenciales que funcionen o las siguientes:
```
SEMINUEVOS_EMAIL=ldiaz1995@hotmail.com
SEMINUEVOS_PASSWORD=Motor.95
```

### 3. Instalación

```
cd api
npm install
cd ..
cd frontend
npm install
```

### 4. Ejecución

Con dos terminales distintas corre

En la carpeta /api:
```
node index.js
```
En la carpeta /frontend:
```
npm start
```
