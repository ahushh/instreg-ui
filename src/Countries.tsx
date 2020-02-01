import React from 'react';
import CheckBox from 'arui-feather/checkbox';
import CheckBoxGroup from 'arui-feather/checkbox-group';
import Label from 'arui-feather/label';
import Plate from 'arui-feather/plate';
import IconError from 'arui-feather/icon/ui/error';
import Heading from 'arui-feather/heading';
import RadioGroup from 'arui-feather/radio-group';
import Radio from 'arui-feather/radio';

export interface ICountriesValues {
  [k: string]: boolean;
}
interface IProps {
  onChange: (values: ICountriesValues) => void;
  countries: string[];
  values: ICountriesValues;
  minSelected: number;
  maxSelected: number;

  membershipValue: ICountriesValues;
  displayMembership: boolean;
  membershipOnChange: (value: boolean, name: string) => void;
}

export class Countries extends React.Component<IProps> {
  aseanCountries = [
    'Бруней Даруссалам',
    'Вьетнам',
    'Камбоджа',
    'Лаос',
    'Индонезия',
    'Малайзия',
    'Мьянма',
    'Сингапур',
    'Таиланд',
    'Филиппины',
    
  ]

  eaesCountries = [
    'Россия'
  ]

  countriesOptions = this.props.countries.map(name => ({ text: name, value: name }));

  onChange = (checked: boolean, value: string) => {
    let state = { ...this.props.values, [value]: checked };

    const setCountry = (country: string) => {
      state[country] = checked;
    };
    const allSelected = (array: string[]) => array.every(country => state[country]);
    const allDeselected = (array: string[]) => array.every(country => !state[country]);

    const handleCountryGroup = (group: string[], groupValue: string) => {
      if (value === groupValue) {
        group.forEach(setCountry);
      }
      if (allSelected(group)) {
        state[groupValue] = true;
      }
      if (allDeselected(group)) {
        state[groupValue] = false
      }
    }

    handleCountryGroup(this.aseanCountries, 'АСЕАН');
    handleCountryGroup(this.eaesCountries, 'ЕАЭС');

    this.props.onChange(state);
  }

  get selectedCount() {
    let selected = Object.keys(this.props.values).filter(k => this.props.values[k]);

    const handleCountryGroup = (group: string[], groupValue: string) => {
      if (selected.find(x => x === groupValue)) {
        selected = selected.filter(k => !group.includes(k));
      }
    };

    handleCountryGroup(this.aseanCountries, 'АСЕАН');
    handleCountryGroup(this.eaesCountries, 'ЕАЭС');

    return selected.length;
  }

  isDisabled = (value: string) => {
    const isSelected = this.props.values[value];
    if (isSelected) {
      return false;
    }

    if (this.selectedCount && this.props.maxSelected === this.selectedCount) {
      return true;
    }
    return false;
  }

  get label() {
    if (this.props.minSelected && !this.props.maxSelected) {
      return `Необходимо выбрать не меньше ${this.props.minSelected}`
    }
    if (this.props.maxSelected && this.props.minSelected && this.props.maxSelected === this.props.minSelected) {
      return `Необходимо выбрать ровно ${this.props.maxSelected}`
    }
    return '';
  }

  get isValid() {
    if (this.props.minSelected && (this.selectedCount < this.props.minSelected)) {
      return false;
    }
    if (this.props.maxSelected && (this.selectedCount > this.props.maxSelected)) {
      return false;
    }
    return true;
  }
  renderMembership(value: boolean, country: string) {
    if (!this.props.displayMembership) {
      return null;
    }
    return (<RadioGroup label={'Состоит в базовом?'} key={'membership' + country} className='App__membership'>
      <Radio
        text={'Да'}
        value={'yes'}
        onChange={() => this.props.membershipOnChange(true, country)}
        checked={value}
      />
      <Radio
        text={'Нет'}
        value={'no'}
        onChange={() => this.props.membershipOnChange(false, country)}
        checked={!value}
      />
    </RadioGroup>);
  }
  render() {
    console.log(this.props.minSelected, this.props.maxSelected);
    return (<div>
      <Heading size='xs'>
        Выберите страны/объединения:
      </Heading>
      {
        !this.isValid && <Plate
          title='Выбрано неверное количество стран/объединений:'
          type='error'
          icon={
            <IconError
              colored={true}
            />
          }
        />
      }
      <div className="App__container">
        <CheckBoxGroup label={<Label size='m'>{this.label}</Label>}>
          {this.countriesOptions.map(option => (
            <div key={option.value} style={{ display: 'flex' }}>
              <CheckBox
                key={option.value}
                onChange={this.onChange}
                disabled={this.isDisabled(option.value)}
                checked={this.props.values[option.value]}
                {...option}
              />
              {this.renderMembership(this.props.membershipValue[option.value], option.value)}
            </div>
          ))}
        </CheckBoxGroup>
      </div>
    </div>)
  }
}