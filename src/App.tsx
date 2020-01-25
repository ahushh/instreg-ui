import React from 'react';
import Heading from 'arui-feather/heading';

import { Countries, ICountriesValues } from './Countries';

import './App.css';
import { IInstitute, Institutes, IInstituteValues, generateInitialValuesForInstitutes } from './Institutes';

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
  'Острова Кука',
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

const COMITMENT: IInstitute = {
  label: 'Степень обязательства',
  value: 'commitment',
  type: 'radio',
  options: [
    { label: 'рекомендательный', value: 'non-regulatory' },
    { label: 'обязывающий', value: 'regulatory' }
  ]
};

const UNIQNESS_ALTERNATIVE: IInstitute = {
  // condition: (values: IInstituteValues) => {
  //   return values['uniqness/alternative'].value;
  // },
  label: 'Какая именно альтернатива?',
  level: 1,
  value: 'uniqness-alternative',
  type: 'radio',
  options: [
    { label: 'Сфера деятельности', value: 'scope' },
    { label: 'Степень обязательства', value: 'commitment' },
    { label: 'Наличие базового института', value: 'has-basic' }
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
      children: [
        UNIQNESS_ALTERNATIVE
      ]
    },
    { label: 'нет альтернативного', value: 'unique' }
  ]
};

const INHERITANCE_REQUIRED: IInstitute = {
  // condition: (values: IInstituteValues) => {
  //   console.log('condition', values['inheritance/deriative']);
  //   return values['inheritance/deriative'].value;
  // },
  level: 1,
  label: 'Требование к наследованию',
  value: 'inheritance required',
  type: 'radio',
  options: [
    { label: 'требуется вступить в базовый', value: 'yes' },
    { label: 'не требуется', value: 'no' }
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
      children: [
        INHERITANCE_REQUIRED
      ]
    }
  ]
};

const OPENNESS: IInstitute = {
  label: 'Открытость',
  value: 'openness',
  type: 'radio',
  options: [
    { label: 'открытый регионализм', value: 'open regionalism' },
    { label: 'закрытый регионализм', value: 'closed regionalism' }
  ]
};

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

const INSTITUTES: IInstitute[] = [
  SCOPE,
  LATERALISM,
  COMITMENT,
  UNIQNESS,
  // UNIQNESS_ALTERNATIVE,
  INHERITANCE,
  // INHERITANCE_REQUIRED,
  OPENNESS,
  ADVOCACY,
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
}
class App extends React.Component<IProps, IState> {
  countries = COUNTRIES;
  institutes = INSTITUTES;

  state = {
    countries: this.countries.reduce((a, c) => ({ ...a, [c]: false }), {}),
    institutes: generateInitialValuesForInstitutes(this.institutes),
    minCountriesSelected: 0,
    maxCountriesSelected: 0,
  }

  onInstituteChange = (institutes: IInstituteValues) => {
    let selectedRestrictions = {};
    if (institutes['lateralism/bilateral']) {
      selectedRestrictions = { minCountriesSelected: 2, maxCountriesSelected: 2 };
    } else if (institutes['lateralism/multilateral']) {
      selectedRestrictions = { minCountriesSelected: 3, maxCountriesSelected: 0 };
    }
    this.setState({ institutes, ...selectedRestrictions });
    console.log(institutes);

  }
  onCountriesChange = (countries: ICountriesValues) => {
    this.setState({ countries });
    console.log(countries);
  }

  render() {
    return (
      <div className="App">
        <div className="App__institutes">
          <Heading size='xs'>
            Выберите характеристики института:
          </Heading>
          <Institutes
            institutes={this.institutes}
            onChange={this.onInstituteChange}
            values={this.state.institutes}
          />
        </div>
        <div className="App__countries">
          <Countries
            countries={this.countries}
            onChange={this.onCountriesChange}
            values={this.state.countries}
            minSelected={this.state.minCountriesSelected}
            maxSelected={this.state.maxCountriesSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;
