import { useState } from 'react';
import { Diagnosis } from '../../../types';

const useCommonEntry = () => {
  const [description, setDescription] = useState('');
  const currentDate = new Date();
  const [date, setDate] = useState(
    `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`
  );
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [errorMessage, setErrorMessage] = useState('');

  return {
    description,
    setDescription,
    date,
    setDate,
    specialist,
    setSpecialist,
    diagnosisCodes,
    setDiagnosisCodes,
    errorMessage,
    setErrorMessage,
  };
};

export default useCommonEntry;
