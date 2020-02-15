import { Country } from './Country';
import { IInstituteValues } from '../Institutes';

export class Advocacy {
  name = 'advocacy';
  value: number = 0;
  finalModifier = (x: any) => x;

  /**
   *  value: 'advocacy',
    type: 'radio',
    options: [
      { label: 'талассократ', value: 'thalassocratic' },
      { label: 'теллурократия', value: 'tellorocratic' },
      { label: 'нет (независимый)', value: 'none (independent)' }
   *
   * options - массив вида ['advocay/thalasscratic']
   * 
   */
  static getFiltered = (
    numberToFilter: number,
    field: string,
    countries: Country[],
    revert = false
  ) => countries.filter(country => {
    return revert
     // @ts-ignore
      ? country[field] <= numberToFilter
      // @ts-ignore
      : (country[field] >= numberToFilter)
  });

  findMaxCountry = (countries: Country[], property: 'advocacy_thal' | 'advocacy_tel' | 'advocacy_ind') => {
    // @ts-ignore
    return countries.reduce((max, current) => countries[property] > max ? countries[property] : max, 0);
  };
  finMinCountry = (countries: Country[], property: 'advocacy_thal' | 'advocacy_tel' | 'advocacy_ind') => {
    // @ts-ignore
    return countries.reduce((max, current) => countries[property] < max ? countries[property] : max);
  };

  handleCase = (property: string, countries: Country[], advocacy: Advocacy) => {
    // ## Случай 1
    if (Advocacy.getFiltered(0.6, property, countries).length === countries.length) {
      advocacy.value = 0.6
      return;
    // ## Случай 2
    } if (Advocacy.getFiltered(0.5, property, countries).length === countries.length) {
      advocacy.value = 0.5;
      return;
    // ## Случай 3
    } if (Advocacy.getFiltered(0.4, property, countries, true).length === countries.length) {
      advocacy.finalModifier = x => x / 2;
      advocacy.value = 0.1;
      return;
    // ## Случай 4
    } else {
      const min = advocacy.finMinCountry(countries, property as any);
      const max = advocacy.findMaxCountry(countries, property as any);
      const result = max - +min;
      if (result >= 0.4) {
        advocacy.value = 0.25;
      } else if (result < 0.4) {
        advocacy.value = 0.6;
      }
    }
  }

  static create(institutes: IInstituteValues, countriesEntities: Country[]) {
    const advocacy = new Advocacy();
    let property: any = '';

    if (institutes['advocacy/thalassocratic'].value) {
      property = 'advocacy_thal';
      advocacy.handleCase(property, countriesEntities, advocacy);

    } else if (institutes['advocacy/tellorocratic'].value) {
      property = 'advocacy_tel';
      advocacy.handleCase(property, countriesEntities, advocacy);

    } else if (institutes['advocacy/none (independent)'].value) {
      property = 'advocacy_ind';
      advocacy.handleCase(property, countriesEntities, advocacy);

    } else {
      throw new Error('unexpected value');
    }

    return advocacy;
  }
}