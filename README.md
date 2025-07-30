# Assig3 - Weather Forecast Web App — CI/CD Agile Pipeline

El proyecto en es una aplicacion web que permite consultar el clima actual de cualquier ciudad utilizando la API de [OpenWeatherMap](https://openweathermap.org/api). A demas de eso, forma parte de un ejercicio practico de metodos agiles, integración continua (CI) y entrega continua (CD), con despliegue automatico a Netlify mediante GitHub Actions.

---

## CI/CD Pipeline Explicado (GitHub Actions)

Para el pipeline de CI/CD se ejecuta automáticamente en cada push o pull request a la rama `master`.

### Que hace el pipeline paso a paso?

1. **`checkout`**: clona el repo en el runner de GitHub Actions.
2. **`setup-node`**: configura Node.js en el entorno de ejecucion.
3. **`npm ci`**: instala las dependencias en `package-lock.json`.
4. **`npm run lint`**: ejecuta ESLint para la calidad del codigo fuente en `/src`.
5. **`npm test`**: corre las pruebas automatizadas con Jest.
6. **Despliegue a Netlify**:
   - si todo lo anterior pasa se realiza un deploy automatico al entorno **staging** de Netlify usando el token y el ID del sitio configurados con secrets de GitHub (`NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID`).

### Mas sobre el pipeline

- ve la calidad del codigo antes de cada despliegue.
- detecta errores de forma temprana.
- automatiza la entrega continua a Netlify.
- ahorra tiempo en tareas repetitivas.

---

## Despliegue automatico (CD)

- el proyecto se despliega automaticamente en Netlify tras pasar lint y pruebas.
- para produccion puede configurarse el pipeline para incluir `production-deploy: true`.

---

## Instrucciones para ejecutar la app localmente

### Requisitos previos

- navegador
- una API key valida de [OpenWeatherMap](https://openweathermap.org/api)

### 🔧 Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/JRamonRTG/metodos-agiles-assig1.git
cd metodos-agiles-assig1
```

2. **Abrir la app**

Para ello, se da click en el archivo `index.html` en el navegador.
o en dado caso, se configurar para un servidor local.

3. **Agregar API**

Edita el archivo app.js y se reemplaza esta linea:
```bash
const apiKey = 'TU_API_KEY';
```
reemplazando `TU_API_KEY` con la API key de OpenWeatherMap.

4. **Buscar la ciudad**

Se debe escribir el nombre de la ciudad, como por ejemplo, London o Guatemala y presionar 'Buscar'

5. **Obtenga ek resultado desplegado en pantalla con datos como**

- Nombre de la ciudad

- Descripción del clima

- Temperatura (°C)

- Humedad (%)

- Velocidad del viento (m/s)


## Notas

Si aparece un mensaje como "Ciudad no encontrada" verifica:

- Escribir correctamente el nombre (o usa nombres en ingles).

- Tener una API Key valida.


## Tecnologias Utilizadas
- Frontend: HTML, CSS, JavaScript
- API publica: OpenWeatherMap (https://openweathermap.org/api)
- GitHub para control de versiones y gestion agil
- Testing: Jest
- Linting: ESLint
- CI/CD: GitHub Actions
- Deploy: Netfly

## Comandos varios y pasos utilizados para el desarrollo y despliegue de la aplicación.

```bash
npm init -y
descargar node.js
descargar npm
npm install
npm install eslint --save-dev
npx eslint --

instalar jest para pruebas:
npm install --save-dev jest

npm run lint 
npm test           
```

a demas, se debe tomar en cuenta la creacion de carpeta 
con archivos estructurado similar a esto:

```bash
app/
├── .github/
├── node_modules/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── tests/
│   └── app.test.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
```


## URL DEL SITIO

https://gentle-youtiao-329823.netlify.app/