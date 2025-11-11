# 🏦 Devsu Bank - Frontend

Este es el **frontend** de la aplicación **Devsu Bank**, desarrollado como parte del ejercicio práctico técnico.  
Permite la gestión completa de **clientes**, **cuentas**, **movimientos**, y la **generación de reportes PDF** conectándose al backend en .NET.

---

## 🚀 Tecnologías utilizadas

- **Angular 17+**
- **TypeScript**
- **Bootstrap 5**
- **RxJS**
- **Jest** (para pruebas unitarias)
- **HTML / CSS / SCSS**

---

## ⚙️ Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- [Node.js (v18 o superior)](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- Un backend funcional (ver: [Devsu Bank - Backend](https://github.com/ebchalacan92/devsu-bank-backend))

---

## ▶️ Ejecución del proyecto

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Ejecutar la aplicación

```bash
npm start
```

Por defecto, se abrirá en:  
👉 **http://localhost:4200**

---

## 🔧 Configuración de entorno

Revisa o edita el archivo:  
`src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

Si el backend se ejecuta en otro puerto o dominio, actualiza la propiedad `apiUrl` con la URL correspondiente.

---

## 🧩 Estructura del proyecto

```
src/
 ├── app/
 │   ├── clients/           → CRUD de clientes
 │   ├── accounts/          → CRUD de cuentas
 │   ├── movements/         → Registro y validaciones de movimientos
 │   ├── reports/           → Generación y descarga de reportes PDF
 │   ├── services/          → Conexión con el backend (.NET API)
 │   ├── navbar/            → Barra de navegación principal
 │   └── app.routes.ts      → Rutas principales del proyecto
 │
 ├── assets/                → Recursos estáticos (logos, íconos, etc.)
 ├── environments/          → Configuración de entornos
 ├── main.ts                → Punto de entrada de Angular
 └── styles.css             → Estilos globales
```

---

## 🧪 Pruebas unitarias

Este proyecto está configurado con **Jest**.

Ejecuta los tests con:

```bash
npm test
```

> En caso de estar configurado con Karma (Angular default):
> ```bash
> ng test
> ```

---

## ✨ Funcionalidades principales

✅ CRUD de clientes (crear, editar, eliminar, buscar)  
✅ CRUD de cuentas bancarias (asociadas a clientes)  
✅ Registro de movimientos con validaciones de negocio (saldo y límites diarios)  
✅ Generación y descarga de reportes PDF  
✅ Interfaz intuitiva con **Bootstrap 5**  
✅ Integración directa con el backend .NET  

---

## 📄 Estructura de navegación

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| Clientes | `/clientes` | Gestión de clientes |
| Cuentas | `/cuentas` | Gestión de cuentas |
| Movimientos | `/movimientos` | Registro de depósitos y retiros |
| Reportes | `/reportes` | Generación de reportes PDF |

---

## 🧠 Buenas prácticas aplicadas

- Uso de **servicios Angular** centralizados (`/services`)  
- Separación por módulos (clientes, cuentas, movimientos, reportes)  
- **Reactive Forms** para validaciones y control de formularios  
- Manejo de errores de backend con alertas en el frontend  
- Código estandarizado con Prettier  
- Diseño responsivo con Bootstrap  

---

## 👨‍💻 Autor

**Edwin Chalacan**  
📧 [edwin.chalacan@outlook.com](mailto:edwin.chalacan@outlook.com)  
🔗 [GitHub: ebchalacan92](https://github.com/ebchalacan92)

---

## 🧱 Repos relacionados

- 🔹 **Backend (.NET 8)** → [Devsu Bank - Backend](https://github.com/ebchalacan92/devsu-bank-backend)
- 🔹 **Frontend (Angular)** → [Devsu Bank - Frontend](https://github.com/ebchalacan92/devsu-bank-frontend)

---

> 💡 Si deseas ejecutar ambos proyectos juntos, asegúrate de tener el backend corriendo en `https://localhost:5001`  
> antes de iniciar el frontend.
