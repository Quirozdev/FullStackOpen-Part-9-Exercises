import Part from './Part';

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => {
        return <Part part={part} />;
      })}
    </>
  );
};

export default Content;
