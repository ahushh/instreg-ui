import React from 'react';
import CheckBox from 'arui-feather/checkbox';
import CheckBoxGroup from 'arui-feather/checkbox-group';
import Label from 'arui-feather/label';
import Plate from 'arui-feather/plate';
import IconError from 'arui-feather/icon/ui/error';
import Heading from 'arui-feather/heading';

export interface ICountriesValues {
  [k: string]: boolean;
}
interface IProps {
  onChange: (values: ICountriesValues) => void;
  countries: string[];
  values: ICountriesValues;
  minSelected: number;
  maxSelected: number;
}

export class Countries extends React.Component<IProps> {
  aseanCountries = [
    'Бруней',
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
    if (selected.find(x => x === 'АСЕАН')) {
      selected = selected.filter(k => !this.aseanCountries.includes(k));
    }
    if (selected.find(x => x === 'ЕАЭС')) {
      selected = selected.filter(k => !this.eaesCountries.includes(k));
    }
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
    if (this.props.minSelected && this.props.minSelected < this.selectedCount) {
      return false;
    }
    if (this.props.maxSelected && this.props.maxSelected > this.selectedCount) {
      return false;
    }
    return true;
  }

  render() {
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
      <CheckBoxGroup label={<Label size='m'>{this.label}</Label>}>
        {this.countriesOptions.map(option => (
          <CheckBox
            key={option.value}
            onChange={this.onChange}
            disabled={this.isDisabled(option.value)}
            checked={this.props.values[option.value]}
            {...option}
          />
        ))}
      </CheckBoxGroup>

    </div>)
  }
}