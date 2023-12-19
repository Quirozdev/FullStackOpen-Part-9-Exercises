import express from 'express';
import { parseBMIArguments, calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
