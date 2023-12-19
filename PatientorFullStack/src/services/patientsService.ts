import patients from '../../data/patients';
import { NonSensitivePatientEntry } from '../../types';

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

export default {
  getAllPatients,
};
