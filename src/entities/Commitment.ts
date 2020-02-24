import { IInstituteValues } from '../components/Institutes';
import { COMMITMENT_NON_REG, COMMITMENT_REG } from '../constants/institutes';

export class Commitment {
  name = 'commitment';
  public value: number = 0;

  static create(institutes: IInstituteValues) {
    const commitment = new Commitment();

    if (institutes[COMMITMENT_NON_REG].value) {
      commitment.value = 0.4;
      return commitment;
    }
    if (institutes[COMMITMENT_REG].value) {
      commitment.value = 0.6;
      return commitment;
    }
    return commitment;
  }
}