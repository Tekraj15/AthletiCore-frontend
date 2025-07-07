// utils/parseFormFields.ts
export const parseFormFieldsWithMeta = (
  fields: { key: string; value: string }[],
  labelMap?: Record<string, string>
): Record<string, string> => {
  return fields.reduce((acc, field) => {
    const label = labelMap?.[field.key] ?? field.key;
    acc[label] = field.value;
    return acc;
  }, {} as Record<string, string>);
};
