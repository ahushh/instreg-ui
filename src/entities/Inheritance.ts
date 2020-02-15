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
    if (institutes['inheritance/new'].value) {
      inheritance.value = 0.4;
    } else if (institutes['inheritance/deriative'].value) {
        const { children } = institutes['inheritance/deriative'];
        inheritance.value = InheritanceRequired.create(children || {}, countries, membership).value;
    } else {
        throw new Error('unexpected value')
    }
    return inheritance;
  }
}