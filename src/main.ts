import { CRMController } from './controllers/crm.controller';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");

// Función asíncrona para agregar usuario
async function addUsuario() {
  console.log("Agregando un nuevo usuario...");

  const guardaConExito = await miEscuelaCRM.registrarUsuarioAsync({
    id: 5, // ID único disponible
    nombre: "Ana Torres",
    rol: "alumno",
    activo: true
  });

  if (guardaConExito) {
    console.log("Usuario agregado con éxito.");
  } else {
    console.log("Error al agregar el usuario.");
  }
}

// Ejecutamos la función asíncrona
addUsuario();

// Código sincrónico que se ejecuta mientras la promesa está en espera
console.log("Versión del CRM:", miEscuelaCRM.verVersion());

const profesores = miEscuelaCRM.filtrarUsuariosPorRol("profesor");
console.log("Profesores del centro:", profesores);