import { Advocacy } from './Advocacy';



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
  static create(options: string[], advocacy: Advocacy) {
    const uniqueness = new Uniqueness();
    if (options.includes('uniqueness/unique')) {
      uniqueness.value = 0.35;
      return uniqueness;
    }
    return uniqueness;
  }
}