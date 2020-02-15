import { Advocacy } from './Advocacy';
import { IInstituteValues } from '../components/Institutes';




// const OPENNESS: IInstitute = {
//   label: 'Открытость',
//   value: 'openness',
//   type: 'radio',
//   options: [
//     { label: 'открытый регионализм', value: 'open regionalism' },
//     {
//       label: 'закрытый регионализм',
//       value: 'closed regionalism',
//       children: () => [
//         ADVOCACY
//       ]
//     }
//   ]
// };

export class Openness {
  name = 'openness';
  public value = 0;
  static create(options: IInstituteValues, advocacy: Advocacy) {
    const openness = new Openness();

    if (options['open regionalism'].value) {
      openness.value = 0.5;
    } else if (options['closed regionalism']) {
      return (0.5 + advocacy.value) / 2;
    } else {
      throw new Error('unexpected value');
    }

    return openness;
  }
}