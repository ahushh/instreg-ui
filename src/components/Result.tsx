import React from 'react';
import { IInstituteValues } from './Institutes';
import { ICountriesValues } from './Countries';
import { RouterProps } from 'react-router';
import { Result } from '../entities/Result';
import { LATERALISM_MULT, ADVOCACY, ADVOCACY_IND, ADVOCACY_TEL, ADVOCACY_THAL, OPENNESS_OPEN } from '../constants/institutes';
import { toPercent } from '../utils';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import Button from 'arui-feather/button/button';
import Paragraph from 'arui-feather/paragraph';

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
    const isMultilateral = this.props.institutes[LATERALISM_MULT] && this.props.institutes[LATERALISM_MULT].value;
    const chartType = (this.props.institutes[OPENNESS_OPEN] && this.props.institutes[OPENNESS_OPEN].value)
      ? 'all'
      : (this.props.institutes[ADVOCACY_IND] && this.props.institutes[ADVOCACY_IND].value)
        ? 'ind'
        : ( this.props.institutes[ADVOCACY_TEL] && this.props.institutes[ADVOCACY_TEL].value)
          ? 'tel'
          : 'thal';

    return (<div style={{ padding: '10px' }}>
      <Paragraph view='normal'>
        Общая поддержка: {toPercent(value)}%
      </Paragraph>
      <Paragraph view='normal'>
        {isMultilateral && this.renderMultilateral(result, value)}
      </Paragraph>
      <Chart type={chartType} />
      <Link to='/'>
        <Button size='xl'>
          Back
        </Button>
      </Link>
    </div>)
  }
}