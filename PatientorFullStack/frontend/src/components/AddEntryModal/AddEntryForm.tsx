import {
  Alert,
  Button,
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
import axios from 'axios';
import { assertNever, isHealthCheckRating } from '../../utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AddEntryProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnosis[];
  closeModal: () => void;
}

interface AddEntryFormProps extends AddEntryProps {
  entryType: EntryType;
}

const AddHealthCheckEntry = ({
  patient,
  setPatient,
  diagnoses,
  closeModal,
}: AddEntryProps) => {
  const [description, setDescription] = useState('');
  const currentDate = new Date();
  const [date, setDate] = useState(
    `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`
  );
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [errorMessage, setErrorMessage] = useState('');

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    if (isHealthCheckRating(value)) {
      setHealthCheckRating(value);
    }
  };

  const onDiagnosisCodeSelection = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
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
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === 'object'
        ) {
          if (
            error.response.data.error &&
            typeof error.response.data.error === 'string'
          ) {
            setErrorMessage(error.response.data.error);
          }
        } else {
          setErrorMessage('Unknown Axios error');
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong, try again');
      }
    }
  };

  return (
    <form onSubmit={addEntry}>
      <Typography
        variant="subtitle1"
        fontWeight={'bold'}
        align={'center'}
        gutterBottom
      >
        New HealthCheck entry
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label={'Description'}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label="date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          label={'Specialist'}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </FormControl>
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
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          labelId="diagnosis-codes"
          onChange={onDiagnosisCodeSelection}
          variant="standard"
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnose) => {
            return (
              <MenuItem key={diagnose.code} value={diagnose.code}>
                {diagnose.code}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          gap: 14,
          alignItems: 'center',
        }}
      >
        {errorMessage && (
          <Alert severity="error" style={{ flex: 1 }}>
            {errorMessage}
          </Alert>
        )}
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
        <Button variant="contained" color="error" onClick={closeModal}>
          Cancel
        </Button>
      </div>
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
      return <p></p>;
    case EntryType.OccupationalHealthcare:
      return <p></p>;
    default:
      assertNever(entryType);
  }
};

export default AddEntryForm;
