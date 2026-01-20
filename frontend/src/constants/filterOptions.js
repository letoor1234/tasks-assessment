export const SORT_BY_OPTIONS_MAP = [
  { value: "dueDate:asc", label: "Most Urgent" },
  { value: "dueDate:desc", label: "Least Urgent" },
  {
    value: "createdAt:desc",
    label: "Newest First",
  },
  {
    value: "createdAt:asc",
    label: "Oldest First",
  },
  {
    value: "priority:desc",
    label: "Highest Priority",
  },
  {
    value: "priority:asc",
    label: "Lowest Priority",
  },
];

export const getSortLabels = (value) => {
  const option = SORT_BY_OPTIONS_MAP.find((opt) => opt.value === value);
  return option ? option.label : "Sort by";
};

export const SORT_BY_OPTIONS = SORT_BY_OPTIONS_MAP.map(
  (option) => option.value,
);
