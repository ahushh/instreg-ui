import { IInstituteValues } from '../Institutes';


export class InheritanceRequired {

  name = 'inheritance required'

  constructor(public value: number) {

  }

  static create(institutes: IInstituteValues) {
    const instance = new InheritanceRequired(0);

    if (institutes[instance.name + '/yes'].value) {
      
    }

    if (institutes[instance.name + '/no'].value) {
      instance.value = 0.5;
    }
    return instance;
  }
}