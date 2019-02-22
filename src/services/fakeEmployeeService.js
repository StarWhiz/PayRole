const employees = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "John Doe",
    department: { _id: "5b21ca3eeb7f6fbccd471818", name: "Production" },
    hiringDate: "1997-12-24",
    salary: 12.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Marissa Tang",
    department: { _id: "5b21ca3eeb7f6fbccd471818", name: "Production" },
    hiringDate: "1998-9-13",
    salary: 12.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Kevin Nguyen",
    department: { _id: "5b21ca3eeb7f6fbccd471820", name: "Finance" },
    hiringDate: "2006-1-12",
    salary: 13.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Ahmed Joruzo",
    department: { _id: "5b21ca3eeb7f6fbccd471814", name: "Marketing" },
    hiringDate: "2015-6-19",
    salary: 13.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Cheyenne Luzagan",
    department: { _id: "5b21ca3eeb7f6fbccd471814", name: "Marketing" },
    hiringDate: "2014-8-26",
    salary: 13.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Aya Sakigawa",
    department: { _id: "5b21ca3eeb7f6fbccd471814", name: "Marketing" },
    hiringDate: "2000-12-21",
    salary: 13.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    name: "Timothy Burton",
    department: { _id: "5b21ca3eeb7f6fbccd471820", name: "Finance" },
    hiringDate: "1999-2-13",
    salary: 14.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    name: "Carolus Boekema",
    department: { _id: "5b21ca3eeb7f6fbccd471820", name: "Finance" },
    hiringDate: "2001-3-21",
    salary: 13.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    name: "Jackson Timber",
    department: { _id: "5b21ca3eeb7f6fbccd471818", name: "Production" },
    hiringDate: "1985-9-3",
    salary: 13.5
  }
];

export function getEmployees() {
  return employees;
}
