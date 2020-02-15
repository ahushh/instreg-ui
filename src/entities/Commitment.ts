import { IInstituteValues } from '../Institutes';

export class Commitment {
  name = 'commitment';
  public value: number = 0;

  static create(institutes: IInstituteValues) {
    const commitment = new Commitment();

    if (institutes['non-regulatory'].value) {
      commitment.value = 0.4;
      return commitment;
    }
    if (institutes['regulatory'].value) {
      commitment.value = 0.6;
      return commitment;
    }
    return commitment;
  }
}