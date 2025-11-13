const addStudentToCourse = <T extends { name: string; id: number }>(
  studentInfo: T
) => {
  return {
    course: 'Next Level Web Dev',
    ...studentInfo,
  };
};

const student1 = {
  name: 'Asad',
  id: 33,
};

const result = addStudentToCourse(student1);
console.log(result);
