export const useLocalStorage = () => {
  const getItem = (key: string): any => {
    return localStorage.getItem(key);
  };

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clear = () => {
    localStorage.clear();
  };

  return { getItem, setItem, removeItem, clear };
};
