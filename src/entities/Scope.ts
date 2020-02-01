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
  static create(options: string[]) {
    const scope = new Scope();

    if (
      options.includes('scope/economie') && options.includes('scope/military-political')
      ) {
      scope.value = 0.1;
      return scope;
    }

    if (options.includes('scope/economie')) {
      scope.value = 0.7;
      return scope;
    }

    if (options.includes('scope/military-political')) {
      scope.value = 0.3
      return scope;
    }

    return scope;
  }
}