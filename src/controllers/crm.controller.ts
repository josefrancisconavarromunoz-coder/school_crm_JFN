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
}