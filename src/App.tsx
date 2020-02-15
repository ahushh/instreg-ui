import React from 'react';
import Heading from 'arui-feather/heading';
import Button from 'arui-feather/button';

import { CountriesComponent, ICountriesValues } from './Countries';

import './App.css';
import { IInstitute, InstitutesComponent, IInstituteValues, generateInitialValuesForInstitutes } from './Institutes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteProps
} from 'react-router-dom';

import { Country } from '../src/entities/Country';
import { Advocacy } from './entities/Advocacy';
import { ResultComponent } from './Result';

const COUNTRIES = [
  'Австралия',
  'АСЕАН',
  'Бангладеш',
  'Бруней Даруссалам',
  'Восточный Тимор',
  'Вьетнам',
  'Гонконг',
  'ЕАЭС',
  'Евросоюз',
  'Индия',
  'Индонезия',
  'Камбоджа',
  'Канада',
  'Китай',
  'КНДР',
  'Лаос',
  'Макао',
  'Малайзия',
  'Мексика',
  'Монголия',
  'Мьянма',
  'Новая Зеландия',
  // 'Острова Кука',
  'Пакистан',
  'Папуа-Новая Гвинея',
  'Перу',
  'Республика Корея',
  'Россия',
  'Сингапур',
  'США',
  'Тайвань',
  'Таиланд',
  'Филиппины',
  'Чили',
  'Шри-Ланка',
  'Япония'
];

const ADVOCACY: IInstitute = {
  label: 'Поддержка аттрактора',
  value: 'advocacy',
  type: 'radio',
  options: [
    { label: 'талассократ', value: 'thalassocratic' },
    { label: 'теллурократия', value: 'tellorocratic' },
    { label: 'нет (независимый)', value: 'none (independent)' }
  ]
};

const OPENNESS: IInstitute = {
  condition: (props: any) => {
    // TODO: неправильно считается количество выбраных стран с АСЕАН - сделать различие между 
    const { length } = props.countriesValues && Object.keys(props.countriesValues)
      .filter(k => (props.countriesValues as ICountriesValues)[k] as boolean);

    return length >= 3;
  },
  label: 'Открытость',
  value: 'openness',
  type: 'radio',
  options: [
    { label: 'открытый регионализм', value: 'open regionalism' },
    {
      label: 'закрытый регионализм',
      value: 'closed regionalism',
      children: () => [
        ADVOCACY
      ]
    }
  ]
};

const SCOPE: IInstitute = {
  label: 'Сфера деятельности',
  value: 'scope',
  type: 'checkbox',
  options: [
    { label: 'экономическая', value: 'economie' },
    { label: 'военнно-политическая', value: 'military-political' }
  ]
};
const LATERALISM: IInstitute = {
  label: 'Латеральность',
  value: 'lateralism',
  type: 'radio',
  options: [
    { label: 'двухсторонний', value: 'bilateral' },
    { label: 'многосторонний', value: 'multilateral' }
  ]
};

const COMMITMENT: IInstitute = {
  label: 'Степень обязательства',
  value: 'commitment',
  type: 'radio',
  options: [
    { label: 'рекомендательный', value: 'non-regulatory' },
    { label: 'обязывающий', value: 'regulatory' }
  ]
};

const INHERITANCE: IInstitute = {
  label: 'Наследование',
  value: 'inheritance',
  type: 'radio',
  options: [
    { label: 'новый', value: 'new' },
    {
      label: 'производный',
      value: 'deriative',
      children: () => [
        INHERITANCE_REQUIRED
      ]
    }
  ]
};

const INHERITANCE_REQUIRED: IInstitute = {
  label: 'Требование к наследованию',
  value: 'inheritance required',
  type: 'radio',
  options: [
    {
      label: 'требуется вступить в базовый',
      value: 'yes',
      children: () => [
        SCOPE,
        COMMITMENT,
        UNIQNESS,
        OPENNESS
      ]
    },
    { label: 'не требуется', value: 'no' }
  ]
};


const UNIQNESS: IInstitute = {
  label: 'Уникальность',
  value: 'uniqness',
  type: 'radio',
  options: [
    {
      label: 'есть альтернативный',
      value: 'alternative',
      children: () => [
        SCOPE,
        COMMITMENT,
        INHERITANCE,
        OPENNESS
      ]
    },
    { label: 'нет альтернативного', value: 'unique' }
  ]
};


const INSTITUTES: IInstitute[] = [
  SCOPE,
  LATERALISM,
  COMMITMENT,
  UNIQNESS,
  INHERITANCE,
  OPENNESS,
]

/**
 *
 * двусторонний: должно быть две ровно страны
 * многосторонний: не меньше 3
 *
 */

interface IProps {

}
interface IState {
  countries: ICountriesValues;
  institutes: IInstituteValues;
  minCountriesSelected: number;
  maxCountriesSelected: number;
  displayMembership: boolean;
  membership: ICountriesValues;
  isValid: boolean;
}
class AppComponent extends React.Component<Partial<RouteProps> & IProps, IState> {
  countries = COUNTRIES;
  institutes = INSTITUTES;

  state = {
    countries: this.countries.reduce((a, c) => ({ ...a, [c]: false }), {}),
    institutes: generateInitialValuesForInstitutes(this.institutes),
    minCountriesSelected: 0,
    maxCountriesSelected: 0,
    membership: this.countries.reduce((a, c) => ({ ...a, [c]: false }), {}),
    displayMembership: false,
    isValid: false
  }

  onInstituteChange = (institutes: IInstituteValues) => {
    let extraState: any = {};
    if (institutes['lateralism/bilateral'].value) {
      extraState = { minCountriesSelected: 2, maxCountriesSelected: 2 };
    } else if (institutes['lateralism/multilateral'].value) {
      extraState = { minCountriesSelected: 3, maxCountriesSelected: 0 };
    }
    // console.log("institutes['inheritance/deriative'])", institutes['inheritance/deriative']);
    if (institutes['inheritance/deriative'].value) {
      extraState.displayMembership = true;
    } else {
      extraState.displayMembership = false;
    }
    // console.log('extra state', institutes['lateralism/bilateral'], institutes['lateralism/multilateral']);
    this.setState({ institutes, ...extraState });
    // console.log(institutes);

  }
  onCountriesChange = (countries: ICountriesValues) => {
    this.setState({ countries });
    // console.log(countries);
  }

  membershipOnChange = (value: boolean, name: string) => {
    // console.log('membershipOnChange', value, name);
    this.setState({ membership: { ...this.state.membership, [name]: value } });
  }

  get selectedCountries() {
    // TODO: АСЕаН
    return Object.keys(this.state.countries)
      .filter(k => (this.state.countries as ICountriesValues)[k] as boolean);
  }

  get selectedInstitutes() {
    console.log('institutes', this.state.institutes);
    return Object.keys(this.state.institutes)
      .filter((k: string) => {
        const { value, children } = (this.state.institutes as IInstituteValues)[k];
        if (value || children) {
          return true;
        }
        return false;
      });
  }

  render() {
    // console.log('this.selectedInstitutes', this.selectedInstitutes);
    // // console.log('this.selectedCountries', this.selectedCountries);
    // const countriesRaw = Country.createList(this.selectedCountries);
    // console.log('countriesRaw', countriesRaw);

    // const opennessInstitute: any = Object.keys(this.state.institutes)
    //   .find(k => k === 'openness/closed regionalism');

    // console.log('opennessInstitute', (this.state.institutes as any)[opennessInstitute] , this.state);

    // if (opennessInstitute && (opennessInstitute as any).value && (opennessInstitute as any).children){
    //   const advocacy = Advocacy.create(this.selectedInstitutes, countriesRaw);
    //   console.log(advocacy);
    // } 

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <div className="App__institutes">
                <Heading size='xs'>
                  Выберите характеристики института:
                </Heading>
                <InstitutesComponent
                  countriesValues={this.state.countries}
                  institutes={this.institutes}
                  onChange={this.onInstituteChange}
                  values={this.state.institutes}
                />
              </div>
              <div className="App__countries">
                <CountriesComponent
                  countries={this.countries}
                  onChange={this.onCountriesChange}
                  values={this.state.countries}
                  minSelected={this.state.minCountriesSelected}
                  maxSelected={this.state.maxCountriesSelected}
                  membershipValue={this.state.membership}
                  displayMembership={this.state.displayMembership}
                  membershipOnChange={this.membershipOnChange}
                />
              </div>
              <div className='App__submit'>
                <Button width='available' size='xl' view='extra' disabled={!this.state.isValid}>
                  <Link to='/result'>Calculate</Link>
                </Button>
              </div>
            </div>
          </Route>
          <Route path='/result'>
            <ResultComponent 
              countries={this.state.countries}
              institutes={this.state.institutes}
              membership={this.state.membership}
            />
          </Route>
        </Switch>
      </Router>

    );
  }
}

export default AppComponent;
