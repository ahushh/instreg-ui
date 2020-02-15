import { IInstituteValues } from '../components/Institutes';


export class Lateralism {
  name = 'lateralism';
  public value = 0;
  static create(institutes: IInstituteValues) {
    const lateralism = new Lateralism();

    if (institutes['lateralism/bilateral'].value) {
      lateralism.value = 0.8;
    } else if (institutes['laterlaism/multilateral'].value) {
      lateralism.value = 0.5;
    } else {
      throw new Error('unexpected value');
    }
    return lateralism;
  }
}