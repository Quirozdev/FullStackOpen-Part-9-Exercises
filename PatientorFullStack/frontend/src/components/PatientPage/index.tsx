import { useEffect, useMemo, useState } from 'react';
import { DiagnosesDict, Diagnosis, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Container } from '@mui/material';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams() as { id: string };
  const [openEntryModal, setOpenEntryModal] = useState(false);

  const diagnosesDict: DiagnosesDict = useMemo(() => {
    return diagnoses.reduce((dict, currentDiagnose) => {
      return { ...dict, [currentDiagnose.code]: currentDiagnose.name };
    }, {});
  }, [diagnoses]);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    fetchPatient(id);
  }, []);

  if (!patient) {
    return null;
  }

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2>{patient.name}</h2>
        {patient.gender === Gender.Female ? (
          <FemaleIcon style={{ color: 'pink' }} fontSize="large" />
        ) : patient.gender === Gender.Male ? (
          <MaleIcon style={{ color: 'blue' }} fontSize="large" />
        ) : (
          <TransgenderIcon style={{ color: 'gold' }} fontSize="large" />
        )}
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>ocuppation: {patient.occupation}</p>
      <button
        onClick={() => {
          setOpenEntryModal(true);
        }}
      >
        Add entry
      </button>
      <AddEntryModal
        patient={patient}
        setPatient={setPatient}
        diagnoses={diagnoses}
        open={openEntryModal}
        onClose={() => {
          setOpenEntryModal(false);
        }}
      />
      <h3>Entries</h3>
      {patient.entries.map((entry) => {
        return (
          <EntryDetails
            entry={entry}
            diagnosesDict={diagnosesDict}
            key={entry.id}
          />
        );
      })}
    </Container>
  );
};

export default PatientPage;
