import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, NonSensitivePatientEntry, Patient } from '../types';

const getAllPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
};
