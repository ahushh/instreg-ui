import React from 'react';
import Heading from 'arui-feather/heading';
import Button from 'arui-feather/button';

import { CountriesComponent, ICountriesValues } from './components/Countries';

import './App.css';
import { InstitutesComponent, IInstituteValues, generateInitialValuesForInstitutes } from './components/Institutes';

import {
  HashRouter,
  Switch,
  Route,
  Link,
  RouteProps
} from 'react-router-dom';

import { ResultComponent } from './components/Result';
import { COUNTRIES } from './constants/countries';
import { INSTITUTES } from './constants/institutes';

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
    isValid: true
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
    // const isValid = Object.values(this.state.institutes).filter((x: any) => x.value).length === 
    //   this.institutes.filter((x: any) => !x.condition || x.condition({ countriesValues: this.state.countries })).length;
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
      <HashRouter basename='/'>
      <Switch>
          <Route exact path="/">
            <form className="App">
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
            </form>
          </Route>
          <Route path='/result'>
            <ResultComponent 
              countries={this.state.countries}
              institutes={this.state.institutes}
              membership={this.state.membership}
            />
          </Route>
        </Switch>
      </HashRouter>

    );
  }
}

export default AppComponent;
