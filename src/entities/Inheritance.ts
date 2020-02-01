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
import { IInstituteValues } from '../Institutes';
export class Inheritance {
  /**
   *
   * new 0.5
   *
   * @memberof Inheritance
   */
  inheritance = 'inheritance';
  constructor(public value: number) {}

  static create(options: IInstituteValues, inheritanceRequired: any) {
    const inheritance = new Inheritance(0);
    if (options['inheritance/new'].value) {
      inheritance.value = 0.5;
      return inheritance;
    } else {

    }
  }
}