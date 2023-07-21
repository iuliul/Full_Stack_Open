const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.name}>
          {part.name} - {part.exercises} exercises
        </p>
      ))}
      <p>
        <strong>
          Total of{' '}
          {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </strong>
      </p>
    </div>
  );
};