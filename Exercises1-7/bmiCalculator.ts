interface BMIArguments {
  height: number;
  weight: number;
}

export function parseBMIArguments(args: string[]): BMIArguments {
  if (args.length < 4) throw new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('One or both provided values were not numbers');
  }

  return {
    height,
    weight,
  };
}

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight (unhealthy weight)';
  }
  return 'Obese (unhealthy weight)';
}

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
