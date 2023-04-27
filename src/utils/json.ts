export const createDeepCopy = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

export const parseJSON = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('Parsing error on', { value });

    return undefined;
  }
};
