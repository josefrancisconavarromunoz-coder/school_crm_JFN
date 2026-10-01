/* export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
 */
import type { Usuario, Rol } from './models/interfaces';

// Filtra la lista y devuelve todos los usuarios con un rol específico
export function filtrarUsuarioPorRol(usuarios: Usuario[], rol: Rol): Usuario[] {
  return usuarios.filter(usuario => usuario.rol === rol && usuario.activo);
}

// Busca y devuelve un único alumno por su ID
export function devuelveAlumno(usuarios: Usuario[], id: number): Usuario | undefined {
  return usuarios.find(usuario => usuario.id === id && usuario.rol === 'alumno');
}