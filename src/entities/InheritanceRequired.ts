import { IInstituteValues } from '../components/Institutes';
import { Scope } from './Scope';
import { Commitment } from './Commitment';
import { Uniqueness } from './Uniqueness';
import { ICountriesValues } from '../components/Countries';
import { INHERITANCE_REQUIRED_YES, INHERITANCE_REQUIRED_NO } from '../constants/institutes';


export class InheritanceRequired {

  name = 'inheritance required'

  constructor(public value: number) {

  }

  static create(institutes: IInstituteValues, countries: ICountriesValues, countriesMembership: ICountriesValues) {
    const instance = new InheritanceRequired(0);

    if (institutes[INHERITANCE_REQUIRED_NO].value) {
      instance.value = 0.6;
    } else if (institutes[INHERITANCE_REQUIRED_YES].value) {
      const selected = Object.keys(countries);
      const sum = selected.filter(k => countries[k])
        .reduce((a, k) => countriesMembership[k] ? 0.8 : 0.2 + a, 0);
      const a = sum / selected.length;

      const subChildren = institutes[INHERITANCE_REQUIRED_YES].children || {};
      const b = Scope.create(subChildren).value 
        + Commitment.create(subChildren).value
        + Uniqueness.create(subChildren, countries, countriesMembership).value;

      instance.value = (a + b) / Object.keys(subChildren).filter(k => subChildren[k].value).length;
    } else {
      throw new Error('unexptected value');
    }
    return instance;
  }
}