export const departments = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Production" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Marketing" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Finance" }
];

export function getDepartments() {
  return departments.filter(g => g);
}
