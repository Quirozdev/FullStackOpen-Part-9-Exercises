import { useEffect, useState } from 'react';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Container } from '@mui/material';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams() as { id: string };

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
    </Container>
  );
};

export default PatientPage;
