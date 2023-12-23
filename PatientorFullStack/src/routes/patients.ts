import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntryForPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (!patient) {
    return res.sendStatus(404);
  }
  return res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientsService.getPatient(id);
    if (!patient) {
      return res.status(404).send({ error: 'No patient found with that id' });
    }
    const newEntry = toNewEntryForPatient(req.body);
    const addedEntry = patientsService.addEntryForPatient(patient, newEntry);
    return res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

export default router;
