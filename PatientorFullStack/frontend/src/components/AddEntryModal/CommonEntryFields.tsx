import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { Diagnosis } from '../../types';

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

interface CommonEntryFieldsProps {
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

const CommonEntryFields = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnoses,
  diagnosisCodes,
  setDiagnosisCodes,
}: CommonEntryFieldsProps) => {
  const onDiagnosisCodeSelection = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
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
    </>
  );
};

export default CommonEntryFields;
