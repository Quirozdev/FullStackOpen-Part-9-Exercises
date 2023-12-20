import { Gender, NewPatient } from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

const isSSN = (param: string): boolean => {
  return /^[0-9]{6}-[0-9A-Z]{3,4}/.test(param);
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing param');
  }
  return param;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender (male, female or other)');
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const toNewPatientEntry = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    return {
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation),
      ssn: parseSsn(obj.ssn),
    };
  }
  throw new Error('Incorrect data: some fields are invalid');
};

export default toNewPatientEntry;
