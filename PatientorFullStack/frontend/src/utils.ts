import { HealthCheckRating } from './types';

export const assertNever = (argument: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(argument)}`
  );
};

export const isHealthCheckRating = (
  param: string | number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((value) => value.toString())
    .includes(param.toString());
};
