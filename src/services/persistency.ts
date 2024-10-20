import { PersistencyProtocol } from "../classes/interfaces/persistencyProtocol";

export class Persistency implements PersistencyProtocol {
   saveOrder(): void {
    console.log('Saved with success');
  }
}
