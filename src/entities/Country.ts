import { AdvocacyData } from '../data/Advocacy';
import { AffinityData } from '../data/Affinity';

export class Country {
  affinity_abs: number = 0;
  affinity_rel: number = 0;

  advocacy_thal: number = 0;
  advocacy_tel: number = 0;
  advocacy_ind: number = 0;

  constructor(public name: string) { }

  static create(name: string) {

    const advocacy = AdvocacyData.find(([rowName]) => rowName === name) as string[];
    const affinity = AffinityData.find(([rowName]) => rowName === name) as string[];

    const country = new Country(name);

    country.affinity_abs = +affinity[1];
    country.affinity_rel = +affinity[2];

    country.advocacy_thal = +advocacy[1];
    country.advocacy_tel = +advocacy[2];
    country.advocacy_ind = +advocacy[3];

    return country;
  }

  static createList(countries: string[]) {
    return countries.map(x => Country.create(x));
  }
}