import React from 'react';
import { IInstituteValues } from './Institutes';
import { ICountriesValues } from './Countries';
import { RouterProps } from 'react-router';
import { Result } from '../entities/Result';
import { toPercent } from '../utils';
import { LATERALISM_MULT } from '../constants/institutes';
import { Link } from 'react-router-dom';
import Button from 'arui-feather/button/button';

interface IProps {
  institutes: IInstituteValues,
  countries: ICountriesValues,
  membership: ICountriesValues
}

export class ResultComponent extends React.Component<Partial<RouterProps> & IProps> {
  renderMultilateral(result: Result, value: number) {
    const alternateValues = result.calculateAlternate();
    return alternateValues.map((x: string) => (<div>{x}</div>));
  }

  render() {
    const result = new Result(this.props.institutes, this.props.countries, this.props.membership);
    const value = result.calculate();
    const isMultilateral = this.props.institutes[LATERALISM_MULT].value;
    return (<div>
      <div>Общая поддержка: {toPercent(value)}%</div>
      {isMultilateral && this.renderMultilateral(result, value)}
      <Link to='/'>
        <Button size='xl'>
          Back
        </Button>
      </Link>
    </div>)
  }
}