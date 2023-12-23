import React from 'react';
import {
  DiagnosesDict,
  Entry,
  EntryType,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { assertNever } from '../../utils';

const HealthRatingHeart: React.FC<{ value: HealthCheckRating }> = ({
  value,
}) => {
  switch (value) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: 'green', display: 'block' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: 'yellow', display: 'block' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: 'orange', display: 'block' }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: 'red', display: 'block' }} />;
    default:
      assertNever(value);
  }
};

const DiagnosesList: React.FC<{
  diagnosesCodes: string[] | undefined;
  diagnosesDict: DiagnosesDict;
}> = ({ diagnosesCodes, diagnosesDict }) => {
  if (!diagnosesCodes) {
    return null;
  }
  return (
    <ul>
      {diagnosesCodes.map((diagnosecode) => {
        return (
          <li key={diagnosecode}>
            {diagnosecode} {diagnosesDict[diagnosecode]}
          </li>
        );
      })}
    </ul>
  );
};

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
  diagnosesDict: DiagnosesDict;
}> = ({ entry, diagnosesDict }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <p>{entry.date}</p>
        <LocalHospitalIcon />
      </div>
      <em>{entry.description}</em>
      <p>diagnose by {entry.specialist}</p>
      <DiagnosesList
        diagnosesCodes={entry.diagnosisCodes}
        diagnosesDict={diagnosesDict}
      />
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnosesDict: DiagnosesDict;
}> = ({ entry, diagnosesDict }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <p>{entry.date}</p>
        <WorkIcon />
        <p>{entry.employerName}</p>
      </div>
      <em>{entry.description}</em>
      <p>diagnose by {entry.specialist}</p>
      <DiagnosesList
        diagnosesCodes={entry.diagnosisCodes}
        diagnosesDict={diagnosesDict}
      />
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
  diagnosesDict: DiagnosesDict;
}> = ({ entry, diagnosesDict }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <p>{entry.date}</p>
        <MedicalServicesIcon />
      </div>
      <em>{entry.description}</em>
      <HealthRatingHeart value={entry.healthCheckRating} />
      <p>diagnose by {entry.specialist}</p>
      <DiagnosesList
        diagnosesCodes={entry.diagnosisCodes}
        diagnosesDict={diagnosesDict}
      />
    </div>
  );
};

const EntryDetails: React.FC<{
  entry: Entry;
  diagnosesDict: DiagnosesDict;
}> = ({ entry, diagnosesDict }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <HospitalEntryDetails entry={entry} diagnosesDict={diagnosesDict} />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnosesDict={diagnosesDict}
        />
      );
    case EntryType.HealthCheck:
      return (
        <HealthCheckEntryDetails entry={entry} diagnosesDict={diagnosesDict} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
