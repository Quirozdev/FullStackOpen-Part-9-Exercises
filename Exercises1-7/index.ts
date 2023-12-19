import express from 'express';
import { parseBMIArguments, calculateBmi } from './bmiCalculator';
import { parseHoursArguments, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res
      .status(400)
      .send({ error: 'missing query parameters, height or weight' });
  }
  try {
    // first two values are simulating the two first args from process.argv
    const { height, weight } = parseBMIArguments([
      '',
      '',
      req.query.height,
      req.query.weight,
    ] as string[]);
    return res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error: unknown) {
    let messageError = 'Something went wrong.';
    if (error instanceof Error) {
      messageError += ` Error: ${error.message}`;
    }
    return res.status(400).send({ error: messageError });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.send({
      error: 'parameters missing (daily_hours and/or target)',
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.send({
      error: 'malformatted parameters (daily_exercises needs to be an array)',
    });
  }

  try {
    const parsedHours = parseHoursArguments([
      '',
      '',
      target,
      ...(daily_exercises as string[]),
    ] as string[]);
    return res.send(
      calculateExercises(parsedHours.dailyHours, parsedHours.target)
    );
  } catch (error) {
    let errorMessage = 'malformatted parameters';
    if (error instanceof Error) {
      errorMessage += ` (${error.message})`;
    }
    return res.send({ error: errorMessage });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
