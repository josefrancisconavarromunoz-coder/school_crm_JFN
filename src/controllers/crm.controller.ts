import type { 
  Asistencia, 
  Sancion, 
  RegistroHorario, 
  EstadoAsistencia, 
  TipoSancion,
  DiaSemana,
  FranjaHoraria
} from '../models/interfaces';
import { StorageService } from '../services/storage.service';

export class CRMController {
  private asistenciaStorage = new StorageService<Asistencia>('crm_asistencias');
  private sancionesStorage = new StorageService<Sancion>('crm_sanciones');
  private horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  public async registrarAsistencia(
    alumnoId: string,
    profesorId: string,
    franja: FranjaHoraria,
    estado: EstadoAsistencia
  ): Promise<boolean> {
    await this.delay(1500);

    const nuevaAsistencia: Asistencia = {
      id: crypto.randomUUID(),
      alumnoId,
      profesorId,
      fecha: new Date().toISOString().split('T')[0],
      franja,
      estado
    };

    this.asistenciaStorage.add(nuevaAsistencia);
    return true;
  }

  public async registrarSancion(
    alumnoId: string,
    profesorId: string,
    tipo: TipoSancion,
    descripcion: string
  ): Promise<void> {
    await this.delay(1500);

    const nuevaSancion: Sancion = {
      id: crypto.randomUUID(),
      alumnoId,
      profesorId,
      fecha: new Date().toISOString().split('T')[0],
      tipo,
      descripcion
    };

    this.sancionesStorage.add(nuevaSancion);
  }
}
