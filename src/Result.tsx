import React from 'react';
import { IInstituteValues } from './Institutes';
import { ICountriesValues } from './Countries';
import { RouterProps } from 'react-router';
import { Result } from './entities/Result';

interface IProps {
  institutes: IInstituteValues,
  countries: ICountriesValues,
  membership: ICountriesValues
}

export class ResultComponent extends React.Component<Partial<RouterProps> & IProps> {
  render() {
    const result = new Result(this.props.institutes, this.props.countries, this.props.membership);
    const value = result.calculate();
    return (<div>
      Value: {value}
    </div>)
  }
}