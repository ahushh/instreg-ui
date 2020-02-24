import { IInstituteValues } from '../components/Institutes';
import { LATERALISM_BI, LATERALISM_MULT } from '../constants/institutes';


export class Lateralism {
  name = 'lateralism';
  public value = 0;
  static create(institutes: IInstituteValues) {
    const lateralism = new Lateralism();

    if (institutes[LATERALISM_BI].value) {
      lateralism.value = 0.8;
    } else if (institutes[LATERALISM_MULT].value) {
      lateralism.value = 0.5;
    } else {
      throw new Error('unexpected value');
    }
    return lateralism;
  }
}