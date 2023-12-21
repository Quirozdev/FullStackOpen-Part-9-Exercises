export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export interface Entry {}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
