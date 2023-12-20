interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courses.map((course) => {
        return (
          <p>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </>
  );
};

export default Content;
