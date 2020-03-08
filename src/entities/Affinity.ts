import { Country } from './Country';

export class Affinity {

  name = 'advocacy';
  value: number = 0;
  static create(countries: Country[]) {
    const affinity = new Affinity();
    // TODO: неправильная логика, продумать
    affinity.value = countries.reduce((a, c) => a + c.affinity_rel, 0);

    return affinity;
  }
}