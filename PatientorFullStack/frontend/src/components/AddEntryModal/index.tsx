import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { Diagnosis, EntryType, Patient } from '../../types';
import AddEntryForm from './AddEntryForm';

interface AddEntryModalProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnosis[];
  open: boolean;
  onClose: () => void;
}

const AddEntryModal = ({
  open,
  onClose,
  patient,
  setPatient,
  diagnoses,
}: AddEntryModalProps) => {
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType>(
    EntryType.HealthCheck
  );
  const onChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const entryType = Object.values(EntryType).find(
      (entryType) => entryType.toString() === value
    );
    if (entryType) {
      setSelectedEntryType(entryType);
    }
  };

  return (
    <Dialog open={open} fullWidth={true} onClose={onClose}>
      <DialogTitle>Add entry</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the following form to add an entry
        </DialogContentText>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="entry-type">Entry type</InputLabel>
          <Select
            labelId="entry-type"
            value={selectedEntryType}
            onChange={onChange}
          >
            <MenuItem value={EntryType.HealthCheck}>
              {EntryType.HealthCheck}
            </MenuItem>
            <MenuItem value={EntryType.Hospital}>{EntryType.Hospital}</MenuItem>
            <MenuItem value={EntryType.OccupationalHealthcare}>
              {EntryType.OccupationalHealthcare}
            </MenuItem>
          </Select>
        </FormControl>
        <AddEntryForm
          patient={patient}
          setPatient={setPatient}
          diagnoses={diagnoses}
          entryType={selectedEntryType}
          closeModal={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
