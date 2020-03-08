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
import { AdvocacyData } from '../data/Advocacy';
import { toPercent } from '../utils';
import { ADVOCACY_IND, ADVOCACY_THAL, OPENNESS_OPEN, OPENNESS_CLOSED, LATERALISM_BI, LATERALISM_MULT } from '../constants/institutes';

interface IAlternateResult {
  thalas: number;
  tellur: number;
  independent: number;
}

export class Result {
  private baseValue: number = 0;

  constructor(
    public institutes: IInstituteValues,
    public countries: ICountriesValues,
    public membership: ICountriesValues
  ) {

  }

  get selectedCountriesNames() {
    return Object.keys(this.countries)
      .filter(k => (this.countries as ICountriesValues)[k] as boolean)
  }
  calculate(): number {
    // debugger;
    const countriesEntities = Country.createList(this.selectedCountriesNames);

    const scope = Scope.create(this.institutes);
    const lateralism = Lateralism.create(this.institutes);
    const commitment = Commitment.create(this.institutes);
    const uniqueness = Uniqueness.create(this.institutes, this.countries, this.membership);
    const inheritance = Inheritance.create(this.institutes, this.countries, this.membership);
    const affinity = Affinity.create(countriesEntities);

    const calculate = (a: any[]) => a.map(x => x.value).reduce((a, c) => a + c, 0) / a.length;

    if (this.institutes[LATERALISM_BI].value) {
      const arr = [
        scope,
        lateralism,
        commitment,
        uniqueness,
        inheritance,
        affinity
      ];
      this.baseValue = calculate(arr);
      return this.baseValue;
    } else if (this.institutes[LATERALISM_MULT].value) {
      const advocacy = Advocacy.create(this.institutes[OPENNESS_CLOSED].children as any, countriesEntities)
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
      console.log('arr', arr);
      this.baseValue = advocacy.finalModifier(calculate(arr));
      return this.baseValue;
    } else {
      throw new Error('unexpted value');
    }
  }

  private getAlternateResultForOpenRegionalismFirstRow(first: keyof IAlternateResult, second: keyof IAlternateResult, third: keyof IAlternateResult) {
    const mapValues = {
      thalas: 'талассократическому',
      tellur: 'теллурократическому',
      independent: 'независимому аттрактору'
    };

    return `Исходя из выбранных участников, предложенный институт создает наибольшее относительное преимущество ${mapValues[first]}, в меньшей степени ${mapValues[second]} и ${mapValues[third]}.`;
  }

  private compareThalasAndTellur(thalas: number, tellur: number): { valueType: 'thalas' | 'tellur', value: string } {
    console.log('compareThalasAndTellur:', 'thalas', thalas, 'telur', tellur);
    const full = 1.2;
    const result = Math.max(thalas, tellur) - Math.min(thalas, tellur);
    const inPercent = toPercent(result / full);
    const valueType = thalas > tellur ? 'thalas' : 'tellur';
    console.log('compareThalasAndTellur', 'compareThalasAndTellur', valueType, inPercent);
    return { valueType, value: inPercent };
  }

  private getAlternateResultForOpenRegionalismSecondRow(thalas: number, tellur: number): string {
    const { value, valueType } = this.compareThalasAndTellur(thalas, tellur);
    const valueTypeString = valueType === 'thalas' ? 'талассократического' : 'теллурократического';

    return `С вероятностью в ${value}%, будет предпринята попытка создать аналогичный альтернативный институт, создающий относительное преимущество ${valueTypeString} аттрактора.`;
  }

  private getAlternateResultForClosedRegionalism(thalas: number, tellur: number) {
    const { value, valueType } = this.compareThalasAndTellur(thalas, tellur);
    const valueTypeString = valueType === 'thalas' ? 'талассократического' : 'теллурократического';

    return `Исходя из выбранных участников, предложенный институт создает скрытое относительное преимущество ${valueTypeString} аттрактора. С вероятностью в ${value}%, сторонники ${valueTypeString} аттрактора предпримут попытки создать аналогичный альтернативный институт закрытого регионализма.`
  }
  private isThalasAndTellurEqual(result: IAlternateResult) {
    return toPercent(+result.tellur) === toPercent(+result.thalas);
  }
  calculateAlternate(): string[] {
    const result: IAlternateResult = AdvocacyData
      .filter(([country]) => this.selectedCountriesNames.includes(country))
      .reduce((
        a,
        [, thalasValue, tellurValue, indepValue]
      ) => {
        return {
          thalas: a.thalas + +thalasValue,
          tellur: a.tellur + +tellurValue,
          independent: a.independent + +indepValue,
        }
      }, { thalas: 0, tellur: 0, independent: 0 });

    if (this.institutes[OPENNESS_OPEN].value) {
      const [first, second, third] = Object.keys(result)
        .sort((a, b) => result[a as keyof IAlternateResult] - result[b as keyof IAlternateResult]);

      const firstRow = this.getAlternateResultForOpenRegionalismFirstRow(first as keyof IAlternateResult, second as keyof IAlternateResult, third as keyof IAlternateResult);
      const secondRow = this.getAlternateResultForOpenRegionalismSecondRow(result.thalas, result.tellur);
      return [firstRow, secondRow]

    } else if (this.institutes[OPENNESS_CLOSED].value) {
      let firstRow = '';
      let secondRow = '';
      const children = this.institutes[OPENNESS_CLOSED].children as IInstituteValues;
      if (children[ADVOCACY_IND].value) {
        if (this.isThalasAndTellurEqual(result)) {
          firstRow = 'Исходя из выбранного набора участников, предложенный институт не обеспечивает скрытую поддержку талассократического либо теллурократического аттрактора.';
        } else {
          secondRow = this.getAlternateResultForClosedRegionalism(result.thalas, result.tellur);
        }
      } else { // thalassocratic or tellorocratic
        const valueType = children[ADVOCACY_THAL].value ? 'теллурократического' : 'талассократического';
        const inPercent = toPercent(this.baseValue);
        firstRow = `Вероятность возникновения альтернативного института закрытого регионализма, обеспечивающего относительное преимущество ${valueType} аттрактора, соразмерна вероятности возникновения предложенного института в ${inPercent}%.`;
      }
      return [firstRow, secondRow].filter(Boolean);
    } else {
      throw new Error('unexpted value');
    }
  }
}