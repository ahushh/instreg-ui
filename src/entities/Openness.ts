import { Advocacy } from './Advocacy';
import { IInstituteValues } from '../components/Institutes';
import { OPENNESS_OPEN, OPENNESS_CLOSED } from '../constants/institutes';




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
  static create(options: IInstituteValues, advocacy?: Advocacy) {
    const openness = new Openness();

    if (options[OPENNESS_OPEN].value) {
      openness.value = 0.5;
    } else if (options[OPENNESS_CLOSED]) {
      openness.value = (0.5 + (advocacy as Advocacy).value) / 2;
    } else {
      throw new Error('unexpected value');
    }

    return openness;
  }
}