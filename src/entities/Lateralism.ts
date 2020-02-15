import { IInstituteValues } from '../Institutes';


export class Lateralism {
  name = 'lateralism';
  public value = 0;
  static create(institutes: IInstituteValues) {
    const lateralism = new Lateralism();

    if (institutes['lateralism/bilateral'].value) {
      lateralism.value = 0.8;
      return lateralism;
    } else if (institutes['laterlaism/multilateral'].value) {
      lateralism.value = 0.5;
      return lateralism;
    } else {
      throw new Error('unexpected value');
    }
    return lateralism;
  }
}