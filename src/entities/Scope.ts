import { IInstituteValues } from '../components/Institutes';
import { SCOPE_ECONOMIE, SCOPE_MILITARY } from '../constants/institutes';

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
      institutes[SCOPE_ECONOMIE].value && institutes[SCOPE_MILITARY].value
      ) {
      scope.value = 0.1;
      return scope;
    }

    if (institutes[SCOPE_ECONOMIE].value) {
      scope.value = 0.7;
      return scope;
    }

    if (institutes[SCOPE_MILITARY].value) {
      scope.value = 0.3
      return scope;
    }

    return scope;
  }
}