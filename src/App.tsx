import React from 'react';

import { Countries, ICountriesValues } from './Countries';

import './App.css';
import { IInstitute, Institutes, IInstituteValues } from './Institutes';

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

const INSTITUTES: IInstitute[] = [
  {
    label: 'Сфера деятельности',
    value: 'scope',
    type: 'checkbox',
    options: [
      { label: 'экономическая', value: 'economie' },
      { label: 'военнно-политическая', value: 'military-political' }
    ]
  },
  {
    label: 'Латеральность',
    value: 'lateralism',
    type: 'radio',
    options: [
      { label: 'двухсторонний', value: 'bilateral' },
      { label: 'многосторонний', value: 'multilateral' }
    ]
  },
  {
    label: 'Степень обязательства',
    value: 'commitment',
    type: 'radio',
    options: [
      { label: 'рекомендательный', value: 'non-regulatory' },
      { label: 'обязывающий', value: 'regulatory' }
    ]
  },
  {
    label: 'Уникальность',
    value: 'uniqness',
    type: 'radio',
    options: [
      { label: 'есть альтернативный', value: 'alternative' },
      { label: 'нет альтернативного', value: 'unique' }
    ]
  },
  {
    condition: (values: IInstituteValues) => {
      return values['uniqness/alternative'];
    },
    label: 'Какая именно альтернатива?',
    level: 1,
    value: 'uniqness-alternative',
    type: 'radio',
    options: [
      { label: 'Сфера деятельности', value: 'scope' },
      { label: 'Степень обязательства', value: 'commitment'},
      { label: 'Наличие базового института', value: 'has-basic' }
    ]
  },
  {
    label: 'Наследование',
    value: 'inheritance',
    type: 'radio',
    options: [
      { label: 'новый', value: 'new' },
      {
        label: 'производный',
        value: 'deriative',
      }
    ]
  },
  {
    condition: (values: IInstituteValues) => {
      console.log('condition', values['inheritance/deriative']);
      return values['inheritance/deriative'];
    },
    level: 1,
    label: 'Требование к наследованию',
    value: 'inheritance required',
    type: 'radio',
    options: [
      { label: 'требуется вступить в базовый', value: 'yes' },
      { label: 'не требуется', value: 'no' }
    ]
  },
  {
    label: 'Открытость',
    value: 'openness',
    type: 'radio',
    options: [
      { label: 'открытый регионализм', value: 'open regionalism' },
      { label: 'закрытый регионализм', value: 'closed regionalism' }
    ]
  },
  {
    label: 'Поддержка аттрактора',
    value: 'advocacy',
    type: 'radio',
    options: [
      { label: 'талассократ', value: 'thalassocratic' },
      { label: 'теллурократия', value: 'tellorocratic' },
      { label: 'нет (независимый)', value: 'none (independent)' }
    ]
  }
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
    institutes: this.institutes.reduce((a, c) => ({
      ...a,
      ...c.options.reduce((a1, c1) => ({ ...a1, [c.value + '/' + c1.value]: false }))
    }), {}),
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
