// utils/formUtils.ts
export const parseFormFields = (
  fields: { key: string; value: string }[],
  labelMap?: Record<string, string>
): Record<string, string> => {
  return fields.reduce((acc, field) => {
    const key = labelMap?.[field.key] ?? field.key;
    acc[key] = field.value;
    return acc;
  }, {} as Record<string, string>);
};
