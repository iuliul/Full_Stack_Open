import React from 'react';

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
      <Header course={course.name} />
      <ul>
        {course.parts.map((part, index) => (
          <li key={index}>
            <Part part={part.name} exercise={part.exercises} />
          </li>
        ))}
      </ul>
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <p>Number of exercises: {totalExercises}</p>
    </div>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

export default App;
