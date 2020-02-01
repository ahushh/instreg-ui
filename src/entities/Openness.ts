import { Advocacy } from './Advocacy';




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
  static create(options: string[], advocacy: Advocacy) {
    const openness = new Openness();

    if (options.includes('open regionalism')) {
      openness.value = 0.5;
    } else {
      return (0.5 + advocacy.value) / 2;
    }

    return openness;
  }
}