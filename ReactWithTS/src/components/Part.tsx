import { CoursePart, CoursePartBase } from './Content';

interface PartHeaderProps extends CoursePartBase {}

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PartHeader = (props: PartHeaderProps) => {
  return (
    <p>
      <strong>
        {props.name} {props.exerciseCount}
      </strong>
    </p>
  );
};

const Part = (props: PartProps) => {
  const coursePart = props.part;
  const output: JSX.Element[] = [];
  output.push(
    <PartHeader
      name={coursePart.name}
      exerciseCount={coursePart.exerciseCount}
    />
  );

  switch (coursePart.kind) {
    case 'basic':
      output.push(<p>{coursePart.description}</p>);
      break;
    case 'background':
      output.push(<p>{coursePart.description}</p>);
      output.push(
        <p>
          submit to{' '}
          <a href={coursePart.backgroundMaterial}>
            {coursePart.backgroundMaterial}
          </a>
        </p>
      );
      break;
    case 'group':
      output.push(<p>project exercises {coursePart.groupProjectCount}</p>);
      break;
    case 'special':
      output.push(<p>{coursePart.description}</p>);
      output.push(<p>required skills: {coursePart.requirements.join(', ')}</p>);
      break;
    default:
      return assertNever(coursePart);
  }
  return output;
};

export default Part;
