// const INHERITANCE: IInstitute = {
//   label: 'Наследование',
//   value: 'inheritance',
//   type: 'radio',
//   options: [
//     { label: 'новый', value: 'new' },
//     {
//       label: 'производный',
//       value: 'deriative',
//       children: () => [
//         INHERITANCE_REQUIRED
//       ]
//     }
//   ]
// };
import { IInstituteValues } from '../components/Institutes';
import { ICountriesValues } from '../components/Countries';
import { InheritanceRequired } from './InheritanceRequired';
import { INHERITANCE_NEW, INHERITANCE_DER } from '../constants/institutes';
export class Inheritance {
  /**
   *
   * new 0.5
   *
   * @memberof Inheritance
   */
  inheritance = 'inheritance';
  constructor(public value: number) {}

  static create(institutes: IInstituteValues, countries: ICountriesValues, membership: ICountriesValues) {
    const inheritance = new Inheritance(0);
    if (institutes[INHERITANCE_NEW].value) {
      inheritance.value = 0.4;
    } else if (institutes[INHERITANCE_DER].value) {
        const { children } = institutes[INHERITANCE_DER];
        inheritance.value = InheritanceRequired.create(children || {}, countries, membership).value;
    } else {
        throw new Error('unexpected value')
    }
    return inheritance;
  }
}