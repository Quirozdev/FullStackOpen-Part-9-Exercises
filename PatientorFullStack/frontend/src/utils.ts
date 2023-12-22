const assertNever = (argument: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(argument)}`
  );
};
