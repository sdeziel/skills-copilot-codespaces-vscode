function skillsMember() {
  return {
    name: 'John Doe',
    age: 30,
    skills: ['HTML', 'CSS', 'JavaScript'],
    salary: 35000,
    getSalary: function() {
      return this.salary;
    },
    getSkills: function() {
      return this.skills;
    }
  }
}
