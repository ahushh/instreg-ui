import { ICountriesValues } from '../components/Countries';
import { IInstituteValues } from '../components/Institutes';
import { Country } from './Country';
import { Scope } from './Scope';
import { Lateralism } from './Lateralism';
import { Commitment } from './Commitment';
import { Uniqueness } from './Uniqueness';
import { Inheritance } from './Inheritance';
import { Affinity } from './Affinity';
import { Openness } from './Openness';
import { Advocacy } from './Advocacy';

export class Result {
  constructor(
    public institutes: IInstituteValues,
    public countries: ICountriesValues,
    public membership: ICountriesValues
  ) {

  }

  calculate() {
    const selectedCountriesNames = Object.keys(this.countries)
      .filter(k => (this.countries as ICountriesValues)[k] as boolean);
    const countriesEntities = Country.createList(selectedCountriesNames);

    const scope = Scope.create(this.institutes);
    const lateralism = Lateralism.create(this.institutes);
    const commitment = Commitment.create(this.institutes);
    const uniqueness = Uniqueness.create(this.institutes, this.countries, this.membership);
    const inheritance = Inheritance.create(this.institutes, this.countries, this.membership);
    const affinity = Affinity.create(countriesEntities);

    const calculate = (a: any[]) => a.map(x => x.value).reduce((a, c) => a + c, 0) / a.length;

    if (this.institutes['lateralism/bilateral'].value) {
      const arr = [
        scope,
        lateralism,
        commitment,
        uniqueness,
        inheritance,
        affinity
      ];
      return calculate(arr);
    } else if (this.institutes['lateralism/multilateral'].value) {
      const advocacy = Advocacy.create(this.institutes, countriesEntities)
      const openness = Openness.create(this.institutes, advocacy);

      const arr = [
        scope,
        lateralism,
        commitment,
        uniqueness,
        inheritance,
        affinity,
        openness
      ];
      return advocacy.finalModifier(calculate(arr));
    } else {
      throw new Error('unexpted value');
    }
  }
}