import { IInstituteValues } from '../components/Institutes';
import { Scope } from './Scope';
import { Commitment } from './Commitment';
import { Inheritance } from './Inheritance';
import { ICountriesValues } from '../components/Countries';
import { UNIQUENESS_UNIQ, UNIQUENESS_ALT } from '../constants/institutes';



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
    if (institutes[UNIQUENESS_UNIQ].value) {
      uniqueness.value = 0.35;
    } else if (institutes[UNIQUENESS_ALT].value) {
      const { children = {} } = institutes[UNIQUENESS_ALT];
      uniqueness.value = 0.6 + Scope.create(children).value 
        + Commitment.create(children).value
        + Inheritance.create(children, countries, membership).value;
    } else {
      debugger;
      throw new Error('unexpected value')
    }
    return uniqueness;
  }
}