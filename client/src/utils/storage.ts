const storagePrefix = 'contudo_';

export const getStorageByKey = <T>(key: string): T => {
  return JSON.parse(
    window.localStorage.getItem(`${storagePrefix}${key}`) as string
  );
};

export const setStorage = (key: string, value: any) => {
  window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
};

export const deleteStorageByKey = (key: string) => {
  window.localStorage.removeItem(`${storagePrefix}${key}`);
};

export const deleteAllStorage = () => {
  window.localStorage.clear();
};
