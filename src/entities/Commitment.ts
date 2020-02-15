import { IInstituteValues } from '../components/Institutes';

export class Commitment {
  name = 'commitment';
  public value: number = 0;

  static create(institutes: IInstituteValues) {
    const commitment = new Commitment();

    if (institutes['commitment/non-regulatory'].value) {
      commitment.value = 0.4;
      return commitment;
    }
    if (institutes['commitment/regulatory'].value) {
      commitment.value = 0.6;
      return commitment;
    }
    return commitment;
  }
}