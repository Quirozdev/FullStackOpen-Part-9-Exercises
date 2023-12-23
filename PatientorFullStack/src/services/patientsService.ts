import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import {
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

const getAllPatients = (): NonSensitivePatient[] => {
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

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryForPatient = (patient: Patient, entry: EntryWithoutId) => {
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllPatients,
  getPatient,
  addPatient,
  addEntryForPatient,
};
