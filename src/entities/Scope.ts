import { IInstituteValues } from '../Institutes';

export class Scope {
  name = 'scope';
  public value: number = 0;

  /**
   * 
   * List of values
   * scope/economie
   * scope/military-political
   * 
   * or both presented in options variable.
   *
   */
  static create(institutes: IInstituteValues) {
    const scope = new Scope();

    if (
      institutes['scope/economie'].value && institutes['scope/military-political'].value
      ) {
      scope.value = 0.1;
      return scope;
    }

    if (institutes['scope/economie'].value) {
      scope.value = 0.7;
      return scope;
    }

    if (institutes['scope/military-political'].value) {
      scope.value = 0.3
      return scope;
    }

    return scope;
  }
}