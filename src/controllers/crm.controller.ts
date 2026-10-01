import type { Usuario, Rol } from "../models/interfaces";

export class CRMController {
  // Propiedades
  private usuariosDelCentro: Usuario[] = [];
  private readonly CLAVE_STORAGE = "school-crm-usuarios";

  // Constructor
  constructor(private version: string) {
    const datosLocales = localStorage.getItem(this.CLAVE_STORAGE);
    if (datosLocales) {
      this.usuariosDelCentro = JSON.parse(datosLocales);
    } else {
      this.usuariosDelCentro = [
        { id: 1, nombre: "Juan Pérez", rol: "admin", activo: true },
        { id: 2, nombre: "María López", rol: "profesor", activo: true },
        { id: 3, nombre: "Carlos García", rol: "alumno", activo: true },
      ];
      this.guardarEnDisco();
    }
  }

  // Método asíncrono CON verificación de duplicados
  public registrarUsuarioAsync(usuario: Usuario): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `[NETWORK]: Conectando con el servidor escolar para registrar a ID ${usuario.id}...`
      );

      // Simulamos retraso de red de 2 segundos
      setTimeout(() => {
        // 1. Comprobamos si el ID ya existe
        const idDuplicado = this.usuariosDelCentro.some(
          (u) => u.id === usuario.id
        );

        if (idDuplicado) {
          console.error(
            `El usuario con ID [${usuario.id}] ya existe.`
          );
          resolve(false); // Resolvemos con false porque no se pudo agregar
          return;
        }

        // 2. Si no está duplicado, lo añadimos
        this.usuariosDelCentro.push(usuario);
        this.guardarEnDisco();

        console.log(`Usuario ${usuario.nombre} registrado con éxito.`);
        resolve(true); // Resolvemos con true
      }, 2000);
    });
  }

  // Métodos de consulta y auxiliares
  filtrarUsuariosPorRol(rolBuscado: Rol): Usuario[] {
    return this.usuariosDelCentro.filter(
      (usuario) => usuario.rol === rolBuscado
    );
  }

  actualizaVersion(nuevaVersion: string): void {
    this.version = nuevaVersion;
  }

  verVersion(): string {
    return this.version;
  }

  public agregarUsuario(nuevoUsuario: Usuario): void {
    const idDuplicado = this.usuariosDelCentro.some(
      (user) => user.id === nuevoUsuario.id
    );

    if (idDuplicado) {
      console.error(
        ` Error: El usuario con ID [${nuevoUsuario.id}] ya existe en el SchoolCRM.`
      );
      return;
    }

    this.usuariosDelCentro.push(nuevoUsuario);
    console.log(`Usuario ${nuevoUsuario.nombre} añadido correctamente.`);
    this.guardarEnDisco();
  }

  private guardarEnDisco(): void {
    localStorage.setItem(
      this.CLAVE_STORAGE,
      JSON.stringify(this.usuariosDelCentro)
    );
  }
}