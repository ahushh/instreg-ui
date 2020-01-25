import React from 'react';
import RadioGroup from 'arui-feather/radio-group';
import Radio from 'arui-feather/radio';
import Checkbox from 'arui-feather/checkbox';
import CheckboxGroup from 'arui-feather/checkbox-group';
import Heading from 'arui-feather/heading';

export interface IInstituteValues {
  [k: string]: boolean;
}
interface IProps {
  values: IInstituteValues;
  institutes: IInstitute[];
  onChange: (values: IInstituteValues) => void;
}

export interface IOption {
  label: string;
  value: string;
  children?: IInstitute[];
}

export interface IInstitute {
  condition?: Function;
  label: string;
  value: string;
  type: 'checkbox' | 'radio';
  options: IOption[];
}

export class Institutes extends React.Component<IProps> {
  getResultValue(groupValue: string, optionValue: string) {
    return groupValue + '/' + optionValue;
  }

  onChangeRadio = (groupValue: string) => (value: string, checked: boolean) => {
    const result = this.getResultValue(groupValue, value);
    const otherValues = Object.keys(this.props.values)
      .filter(x => {
        const [a,] = x.split('/');
        return a === groupValue;
      })
      .filter(x => {
        const [, b] = x.split('/');
        return b !== value;
      });
    console.log(result, checked);
    const state = { ...this.props.values, [result]: checked };
    otherValues.forEach(v => {
      state[v] = !checked;
    });

    this.props.onChange(state);
  }

  onChangeCheckbox = (groupValue: string) => (checked: boolean, value: string) => {
    const result = this.getResultValue(groupValue, value);
    console.log(result, checked);
    const state = { ...this.props.values, [result]: checked };
    this.props.onChange(state);
  }

  renderRadio = (options: IOption[], label: string, groupValue: string) => {
    return (<RadioGroup label={label}>
      {options.map(o => {
        const resultValue = this.getResultValue(groupValue, o.value);
        return (<div key={resultValue}>
          {/* {this.props.values[this.getResultValue(groupValue, o.value)]} */}
          <Radio
            text={o.label}
            value={o.value}
            onChange={this.onChangeRadio(groupValue)}
            checked={this.props.values[resultValue]}
          />
        </div>);
      })}
    </RadioGroup>);
  }
  renderCheckbox = (options: IOption[], label: string, groupValue: string) => {
    return (<CheckboxGroup label={label}>
      {options.map(o => {
        const resultValue = this.getResultValue(groupValue, o.value);
        return (
          <div key={resultValue}>
            {/* {this.props.values[resultValue]} */}
            <Checkbox
              text={o.label}
              value={o.value}
              onChange={this.onChangeCheckbox(groupValue)}
              checked={this.props.values[resultValue]}
            />
          </div>);
      })}
    </CheckboxGroup>);
  }

  renderInstitute = (institute: IInstitute) => {
    if (institute.condition && !institute.condition(this.props.values)) {
      return null;
    }
    if (institute.type === 'radio') {
      return this.renderRadio(institute.options, institute.label, institute.value);
    }
    if (institute.type === 'checkbox') {
      return this.renderCheckbox(institute.options, institute.label, institute.value);
    }
  }

  render() {
    return <div>
      <Heading size='xs'>
        Выберите характеристики института:
      </Heading>
      {this.props.institutes.map(i => {
        return <div key={i.value} className='App__institute'>{this.renderInstitute(i)}</div>
      })}
    </div>

  }
}