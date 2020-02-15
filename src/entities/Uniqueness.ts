import { Advocacy } from './Advocacy';
import { IInstituteValues } from '../Institutes';
import { Scope } from './Scope';
import { Commitment } from './Commitment';
import { Inheritance } from './Inheritance';
import { ICountriesValues } from '../Countries';



// const UNIQNESS: IInstitute = {
//   label: 'Уникальность',
//   value: 'uniqness',
//   type: 'radio',
//   options: [
//     {
//       label: 'есть альтернативный',
//       value: 'alternative',
//       children: () => [
//         SCOPE,
//         COMMITMENT,
//         INHERITANCE,
//         OPENNESS
//       ]
//     },
//     { label: 'нет альтернативного', value: 'unique' }
//   ]
// };


export class Uniqueness {
  name = 'uniqueness';
  public value = 0;
  static create(institutes: IInstituteValues, countries: ICountriesValues, membership: ICountriesValues) {
    const uniqueness = new Uniqueness();
    if (institutes['uniqueness/unique'].value) {
      uniqueness.value = 0.35;
      return uniqueness;
    } else if (institutes['uniqueness/alternative'].value) {
      const { children = {} } = institutes['uniqueness/alternative'];
      uniqueness.value = 0.6 + Scope.create(children).value 
        + Commitment.create(children).value
        + Inheritance.create(children, countries, membership).value;
    } else {
      throw new Error('unexpected value')
    }
    return uniqueness;
  }
}