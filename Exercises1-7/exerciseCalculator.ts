type RatingScore = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: RatingScore;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesArguments {
  target: number;
  dailyHours: number[];
}

export function parseHoursArguments(args: string[]): ExercisesArguments {
  if (args.length < 4) throw new Error('Not enough arguments');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, targetHoursStr, ...dailyHoursStr] = args;

  const targetHours = Number(targetHoursStr);
  if (isNaN(targetHours)) throw new Error('Target value needs to be a number');

  const dailyHours: number[] = [];
  for (let i = 0; i < dailyHoursStr.length; i++) {
    const dailyHour = Number(dailyHoursStr[i]);
    if (isNaN(dailyHour)) {
      throw new Error(
        'One or more of the provided daily hours were not a number'
      );
    }
    dailyHours.push(dailyHour);
  }
  return {
    target: targetHours,
    dailyHours,
  };
}

export function calculateExercises(
  dailyExerciseHours: number[],
  targetDailyHours: number
): Result {
  const periodLength = dailyExerciseHours.length;
  let trainingDays = 0;
  let success = true;
  let totalHoursExercised = 0;
  for (let i = 0; i < periodLength; i++) {
    const dailyHours = dailyExerciseHours[i];
    if (dailyHours !== 0) {
      trainingDays++;
    }
    if (dailyHours < targetDailyHours) {
      success = false;
    }
    totalHoursExercised += dailyHours;
  }
  const average = totalHoursExercised / periodLength;
  const totalTargetHours = targetDailyHours * periodLength;

  const ratings = {
    1: 'you need to spent more hours exercising to met the target',
    2: 'not too bad but could be better',
    3: 'perfect, keep going!',
  };

  let rating: RatingScore;
  if (totalHoursExercised >= totalTargetHours) {
    rating = 3;
  } else if (totalHoursExercised >= totalTargetHours / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratings[rating],
    target: targetDailyHours,
    average,
  };
}

try {
  const { target, dailyHours } = parseHoursArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
