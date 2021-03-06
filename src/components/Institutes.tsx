import React from 'react';
import RadioGroup from 'arui-feather/radio-group';
import Radio from 'arui-feather/radio';
import Checkbox from 'arui-feather/checkbox';
import CheckboxGroup from 'arui-feather/checkbox-group';
import { ICountriesValues } from './Countries';

const LEVEL_MARGIN = 20;
const LEVEL_PADDING = 5;

export const generateInitialValuesForInstitutes = (institutes: IInstitute[]) => institutes.reduce((a, c) => ({
  ...a,
  ...c.options.reduce((a1, c1) => ({ ...a1, [c.value + '/' + c1.value]: { value: false } }), {})
}), {});

export interface IInstituteValues {
  [k: string]: {
    value: boolean;
    children?: IInstituteValues;
  };
}
interface IProps {
  values: IInstituteValues;
  institutes: IInstitute[];
  onChange: (values: IInstituteValues) => void;
  level: number;
  countriesValues: ICountriesValues;
}

export interface IOption {
  label: string;
  value: string;
  children?: () => IInstitute[];
}

export interface IInstitute {
  condition?: Function;
  label: string;
  value: string;
  type: 'checkbox' | 'radio';
  options: IOption[];
}

export class InstitutesComponent extends React.Component<IProps> {
  static defaultProps = {
    level: 0
  }
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
    // console.log(result, checked);
    const state = {
      ...this.props.values,
      [result]: {
        ...this.props.values[result],
        value: checked
      }
    };
    otherValues.forEach(v => {
      state[v].value = !checked;
    });

    this.props.onChange(state);
  }

  onChangeCheckbox = (groupValue: string) => (checked: boolean, value: string) => {
    const result = this.getResultValue(groupValue, value);
    // console.log(result, checked);
    const state = {
      ...this.props.values,
      [result]: {
        ...this.props.values[result],
        value: checked
      }
    };
    this.props.onChange(state);
  }

  renderChildren = (institute: IInstitute) => {
    const { options, value: groupValue } = institute;

    return options.map(o => {
      const resultValue = this.getResultValue(groupValue, o.value);
      // console.log('o', o, resultValue, this.props.values[resultValue].value);
      if (!(o.children && this.props.values[resultValue].value)) {
        return null;
      }
      if (!this.props.values[resultValue].children) {
        this.props.values[resultValue].children = generateInitialValuesForInstitutes(o.children());
      }
      const onChange = (values: IInstituteValues) => {
        const state = {
          ...this.props.values,
          [resultValue]: {
            ...this.props.values[resultValue],
            children: values
          }
        };
        this.props.onChange(state);
      };
      return (<InstitutesComponent
        values={this.props.values[resultValue].children as IInstituteValues}
        institutes={o.children()}
        onChange={onChange}
        level={ this.props.level + 1}
        countriesValues={ this.props.countriesValues }
      />);
    });
  }
  renderRadio = (institute: IInstitute, parent?: IInstitute) => {
    const { options, label, value: groupValue } = institute;
    return (
      <>
        <RadioGroup label={label}>
          {options.map(o => {
            const resultValue = this.getResultValue(groupValue, o.value);
            // console.log('renderRadio', this.props.values, this.props.values[resultValue], resultValue);
            return (<div key={resultValue}>
              {/* {this.props.values[this.getResultValue(groupValue, o.value)]} */}
              <Radio
                text={o.label}
                value={o.value}
                onChange={this.onChangeRadio(groupValue)}
                checked={this.props.values[resultValue].value}
              />
            </div>);
          })}
        </RadioGroup>
        {this.renderChildren(institute)}
      </>
    );
  }
  renderCheckbox = (institute: IInstitute, parent?: IInstitute) => {
    const { options, label, value: groupValue } = institute;
    return (<>
      <CheckboxGroup label={label}>
        {options.map(o => {
          const resultValue = this.getResultValue(groupValue, o.value);
          // console.log('renderCheckbox', this.props.values, this.props.values[resultValue], resultValue);
          return (
            <div key={resultValue}>
              {/* {this.props.values[resultValue]} */}
              <Checkbox
                text={o.label}
                value={o.value}
                onChange={this.onChangeCheckbox(groupValue)}
                checked={this.props.values[resultValue].value}
              />
            </div>);
        })}
      </CheckboxGroup>
      {this.renderChildren(institute)}
    </>);
  }

  renderInstitute = (institute: IInstitute, parent?: IInstitute) => {
    if (institute.condition && !institute.condition(this.props)) {
      return null;
    }

    const render = () => {
      if (institute.type === 'radio') {
        return this.renderRadio(institute, parent);
      }
      if (institute.type === 'checkbox') {
        return this.renderCheckbox(institute, parent);
      }
    }

    return (<div key={institute.value} className={'App__institute'}>
      {render()}
    </div>);
  }

  render() {
    const style = { 
      marginLeft: `${this.props.level * LEVEL_MARGIN}px`,
      paddingLeft: `${LEVEL_PADDING}px`,
      marginTop: `${this.props.level * LEVEL_PADDING}px`,
      borderLeft: this.props.level ? '1px solid #aaaa' : 'none',
    };

    return (<div style={ style }>
      {this.props.institutes.map(i => {
        return this.renderInstitute(i);
      })}
    </div>);
  }
}