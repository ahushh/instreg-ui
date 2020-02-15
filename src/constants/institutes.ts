import { IInstitute } from '../components/Institutes';

import { ICountriesValues } from '../components/Countries';

export const ADVOCACY: IInstitute = {
  label: 'Поддержка аттрактора',
  value: 'advocacy',
  type: 'radio',
  options: [
    { label: 'талассократ', value: 'thalassocratic' },
    { label: 'теллурократия', value: 'tellorocratic' },
    { label: 'нет (независимый)', value: 'none (independent)' }
  ]
};

export const OPENNESS: IInstitute = {
  condition: (props: any) => {
    // TODO: неправильно считается количество выбраных стран с АСЕАН - сделать различие между 
    const { length } = props.countriesValues && Object.keys(props.countriesValues)
      .filter(k => (props.countriesValues as ICountriesValues)[k] as boolean);

    return length >= 3;
  },
  label: 'Открытость',
  value: 'openness',
  type: 'radio',
  options: [
    { label: 'открытый регионализм', value: 'open regionalism' },
    {
      label: 'закрытый регионализм',
      value: 'closed regionalism',
      children: () => [
        ADVOCACY
      ]
    }
  ]
};

export const SCOPE: IInstitute = {
  label: 'Сфера деятельности',
  value: 'scope',
  type: 'checkbox',
  options: [
    { label: 'экономическая', value: 'economie' },
    { label: 'военнно-политическая', value: 'military-political' }
  ]
};
export const LATERALISM: IInstitute = {
  label: 'Латеральность',
  value: 'lateralism',
  type: 'radio',
  options: [
    { label: 'двухсторонний', value: 'bilateral' },
    { label: 'многосторонний', value: 'multilateral' }
  ]
};

export const COMMITMENT: IInstitute = {
  label: 'Степень обязательства',
  value: 'commitment',
  type: 'radio',
  options: [
    { label: 'рекомендательный', value: 'non-regulatory' },
    { label: 'обязывающий', value: 'regulatory' }
  ]
};

export const INHERITANCE: IInstitute = {
  label: 'Наследование',
  value: 'inheritance',
  type: 'radio',
  options: [
    { label: 'новый', value: 'new' },
    {
      label: 'производный',
      value: 'deriative',
      children: () => [
        INHERITANCE_REQUIRED
      ]
    }
  ]
};

export const INHERITANCE_REQUIRED: IInstitute = {
  label: 'Требование к наследованию',
  value: 'inheritance required',
  type: 'radio',
  options: [
    {
      label: 'требуется вступить в базовый',
      value: 'yes',
      children: () => [
        SCOPE,
        COMMITMENT,
        UNIQNESS,
        OPENNESS
      ]
    },
    { label: 'не требуется', value: 'no' }
  ]
};


export const UNIQNESS: IInstitute = {
  label: 'Уникальность',
  value: 'uniqness',
  type: 'radio',
  options: [
    {
      label: 'есть альтернативный',
      value: 'alternative',
      children: () => [
        SCOPE,
        COMMITMENT,
        INHERITANCE,
        OPENNESS
      ]
    },
    { label: 'нет альтернативного', value: 'unique' }
  ]
};


export const INSTITUTES: IInstitute[] = [
  SCOPE,
  LATERALISM,
  COMMITMENT,
  UNIQNESS,
  INHERITANCE,
  OPENNESS,
]