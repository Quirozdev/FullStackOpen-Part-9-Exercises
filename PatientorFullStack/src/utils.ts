import {
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((value) => Number(value.toString()))
    .includes(param);
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

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      `Value of healthCheckRating incorrect: ${healthCheckRating}`
    );
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (obj: unknown): HospitalEntry['discharge'] => {
  if (
    !obj ||
    typeof obj !== 'object' ||
    !('date' in obj && 'criteria' in obj) ||
    !isString(obj.date) ||
    !isDate(obj.date) ||
    !isString(obj.criteria)
  ) {
    throw new Error(
      'Invalid discharge field (it needs to be an object with the following properties: date(string) and criteria(string))'
    );
  }
  return { date: obj.date, criteria: obj.criteria };
};

const parseSickLeave = (
  obj: unknown
): OccupationalHealthcareEntry['sickLeave'] | undefined => {
  if (!obj || obj === null || typeof obj !== 'object') {
    return undefined;
  }

  if (!('sickLeave' in obj)) {
    return undefined;
  }

  if (obj.sickLeave === null) {
    return undefined;
  }

  if (typeof obj.sickLeave !== 'object') {
    throw new Error('sickLeave must be an object if provided');
  }

  if (Object.keys(obj.sickLeave).length === 0) {
    return undefined;
  }

  if (!('startDate' in obj.sickLeave && 'endDate' in obj.sickLeave)) {
    return undefined;
  }

  if (!isString(obj.sickLeave.startDate) || !isString(obj.sickLeave.endDate)) {
    throw new Error('start date and end date from sickLeave must be strings');
  }

  if (
    obj.sickLeave.startDate.length === 0 &&
    obj.sickLeave.endDate.length === 0
  ) {
    return undefined;
  }

  if (isDate(obj.sickLeave.startDate) && isDate(obj.sickLeave.endDate)) {
    return {
      startDate: obj.sickLeave.startDate,
      endDate: obj.sickLeave.endDate,
    };
  } else {
    throw new Error(
      'Invalid optional sickLeave field (it needs to be an object with the following properties: startDate(string) and endDate(string))'
    );
  }
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
      entries: [],
    };
  }
  throw new Error('Incorrect data: some fields are invalid');
};

const toNewEntryForPatient = (obj: unknown): EntryWithoutId => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in obj)) {
    throw new Error('type of entry must be provided');
  }

  if (!isString(obj.type)) {
    throw new Error(
      'entry type must be a string: (HealthCheck, Hospital or OccupationalHealthcare)'
    );
  }

  if (!('description' in obj && 'date' in obj && 'specialist' in obj)) {
    throw new Error('Missing fields description, date or specialist');
  }

  switch (obj.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in obj)) {
        throw new Error('Missing healthCheckRating field');
      }
      return {
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        type: obj.type,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(obj),
      };
    case 'Hospital':
      if (!('discharge' in obj)) {
        throw new Error('Missing discharge field');
      }
      return {
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        type: obj.type,
        discharge: parseDischarge(obj.discharge),
        diagnosisCodes: parseDiagnosisCodes(obj),
      };
    case 'OccupationalHealthcare':
      if (!('employerName' in obj)) {
        throw new Error('Missing employerName field');
      }
      return {
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        type: obj.type,
        diagnosisCodes: parseDiagnosisCodes(obj),
        employerName: parseString(obj.employerName),
        sickLeave: parseSickLeave(obj),
      };
    default:
      throw new Error(
        'entry type must be a string: (HealthCheck, Hospital or OccupationalHealthcare)'
      );
  }
};

export { toNewPatientEntry, toNewEntryForPatient };
