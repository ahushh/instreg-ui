import { IInstituteValues } from '../components/Institutes';
import { Scope } from './Scope';
import { Commitment } from './Commitment';
import { Uniqueness } from './Uniqueness';
import { ICountriesValues } from '../components/Countries';


export class InheritanceRequired {

  name = 'inheritance required'

  constructor(public value: number) {

  }

  static create(institutes: IInstituteValues, selectedCountries: ICountriesValues, countriesMembership: ICountriesValues) {
    const instance = new InheritanceRequired(0);

    if (institutes['inheritance required/no'].value) {
      instance.value = 0.6;
    } else if (institutes['inheritance required/yes'].value) {
      const selected = Object.keys(selectedCountries);
      const sum = selected.filter(k => selectedCountries[k])
        .reduce((a, k) => countriesMembership[k] ? 0.8 : 0.2 + a, 0);
      const a = sum / selected.length;

      const subChildren = institutes['inheritance required/yes'].children || {};
      const b = Scope.create(subChildren).value 
        + Commitment.create(subChildren).value
        + Uniqueness.create(subChildren, selectedCountries, countriesMembership).value;

      instance.value = (a + b) / Object.keys(subChildren).filter(k => subChildren[k].value).length;
    } else {
      throw new Error('unexptected value');
    }
    return instance;
  }
}