import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Diagnosis, EntryType, HealthCheckRating, Patient } from '../../types';
import React, { useState } from 'react';
import patientsService from '../../services/patients';
import { assertNever, isHealthCheckRating } from '../../utils';
import CommonEntryFields from './CommonEntryFields';
import { handleAxiosError } from './utils';
import useCommonEntry from './hooks/UseCommonEntry';
import FormFooter from './FormFooter';

interface AddEntryProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnosis[];
  closeModal: () => void;
}

interface CommonEntryFields {
  type: EntryType;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
  diagnosisCodes: Array<Diagnosis['code']>;
  setDiagnosisCodes: React.Dispatch<
    React.SetStateAction<Array<Diagnosis['code']>>
  >;
}

interface AddEntryFormProps extends AddEntryProps {
  entryType: EntryType;
}

const AddCommonEntry = ({
  type,
  description,
  setDescription,
  date,
  setDate,
  diagnoses,
  diagnosisCodes,
  setDiagnosisCodes,
  specialist,
  setSpecialist,
}: CommonEntryFields) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight={'bold'}
        align={'center'}
        gutterBottom
      >
        New {type} entry
      </Typography>
      <CommonEntryFields
        description={description}
        date={date}
        diagnoses={diagnoses}
        specialist={specialist}
        diagnosisCodes={diagnosisCodes}
        setDate={setDate}
        setDescription={setDescription}
        setDiagnosisCodes={setDiagnosisCodes}
        setSpecialist={setSpecialist}
      />
    </>
  );
};

const AddHealthCheckEntry = ({
  patient,
  setPatient,
  diagnoses,
  closeModal,
}: AddEntryProps) => {
  const {
    date,
    setDate,
    description,
    setDescription,
    diagnosisCodes,
    setDiagnosisCodes,
    specialist,
    setSpecialist,
    errorMessage,
    setErrorMessage,
  } = useCommonEntry();
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    if (isHealthCheckRating(value)) {
      setHealthCheckRating(value);
    }
  };

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedEntry = await patientsService.addEntry(patient.id, {
        description,
        date,
        specialist,
        healthCheckRating: healthCheckRating as HealthCheckRating,
        diagnosisCodes: diagnosisCodes,
        type: EntryType.HealthCheck,
      });

      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });

      closeModal();
    } catch (error: unknown) {
      setErrorMessage(handleAxiosError(error));
    }
  };

  return (
    <form onSubmit={addEntry}>
      <AddCommonEntry
        type={EntryType.HealthCheck}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        diagnosisCodes={diagnosisCodes}
        setDiagnosisCodes={setDiagnosisCodes}
        specialist={specialist}
        setSpecialist={setSpecialist}
        diagnoses={diagnoses}
      />
      <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="healthcheck-rating">Healthcheck rating</InputLabel>
        <Select
          labelId="healthcheck-rating"
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          <MenuItem value={HealthCheckRating.Healthy}>
            {HealthCheckRating[0]}
          </MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>
            {HealthCheckRating[1]}
          </MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>
            {HealthCheckRating[2]}
          </MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>
            {HealthCheckRating[3]}
          </MenuItem>
        </Select>
      </FormControl>
      <FormFooter errorMessage={errorMessage} closeModal={closeModal} />
    </form>
  );
};

const AddHospitalEntry = ({
  patient,
  setPatient,
  diagnoses,
  closeModal,
}: AddEntryProps) => {
  const {
    date,
    setDate,
    description,
    setDescription,
    diagnosisCodes,
    setDiagnosisCodes,
    specialist,
    setSpecialist,
    errorMessage,
    setErrorMessage,
  } = useCommonEntry();

  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedEntry = await patientsService.addEntry(patient.id, {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes,
        discharge: {
          criteria: dischargeCriteria,
          date: dischargeDate,
        },
        type: EntryType.Hospital,
      });

      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });

      closeModal();
    } catch (error: unknown) {
      setErrorMessage(handleAxiosError(error));
    }
  };

  return (
    <form onSubmit={addEntry}>
      <AddCommonEntry
        type={EntryType.Hospital}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        diagnosisCodes={diagnosisCodes}
        setDiagnosisCodes={setDiagnosisCodes}
        specialist={specialist}
        setSpecialist={setSpecialist}
        diagnoses={diagnoses}
      />
      <Typography variant="overline" align={'left'} gutterBottom>
        Discharge
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="Criteria"
          type="text"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </FormControl>
      <FormFooter errorMessage={errorMessage} closeModal={closeModal} />
    </form>
  );
};

const AddOccupationalHealthcareEntry = ({
  patient,
  setPatient,
  diagnoses,
  closeModal,
}: AddEntryProps) => {
  const {
    date,
    setDate,
    description,
    setDescription,
    diagnosisCodes,
    setDiagnosisCodes,
    specialist,
    setSpecialist,
    errorMessage,
    setErrorMessage,
  } = useCommonEntry();

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedEntry = await patientsService.addEntry(patient.id, {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes,
        employerName: employerName,
        sickLeave: {
          startDate: startDate,
          endDate: endDate,
        },
        type: EntryType.OccupationalHealthcare,
      });

      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });

      closeModal();
    } catch (error: unknown) {
      setErrorMessage(handleAxiosError(error));
    }
  };

  return (
    <form onSubmit={addEntry}>
      <AddCommonEntry
        type={EntryType.OccupationalHealthcare}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        diagnosisCodes={diagnosisCodes}
        setDiagnosisCodes={setDiagnosisCodes}
        specialist={specialist}
        setSpecialist={setSpecialist}
        diagnoses={diagnoses}
      />
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="Employee"
          type="text"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
      </FormControl>
      <Typography variant="overline" align={'left'} gutterBottom>
        Sickleave
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="Start"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="End"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />
      </FormControl>
      <FormFooter errorMessage={errorMessage} closeModal={closeModal} />
    </form>
  );
};

const AddEntryForm = ({
  entryType,
  closeModal,
  patient,
  setPatient,
  diagnoses,
}: AddEntryFormProps) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <AddHealthCheckEntry
          diagnoses={diagnoses}
          patient={patient}
          setPatient={setPatient}
          closeModal={closeModal}
        />
      );
    case EntryType.Hospital:
      return (
        <AddHospitalEntry
          diagnoses={diagnoses}
          patient={patient}
          setPatient={setPatient}
          closeModal={closeModal}
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <AddOccupationalHealthcareEntry
          diagnoses={diagnoses}
          patient={patient}
          setPatient={setPatient}
          closeModal={closeModal}
        />
      );
    default:
      assertNever(entryType);
  }
};

export default AddEntryForm;
