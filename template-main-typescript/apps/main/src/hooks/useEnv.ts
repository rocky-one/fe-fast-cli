export function useEnv() {
  const { VITE_BASE_URL, MODE } = import.meta.env;

  return {
    VITE_BASE_URL,
    MODE
  };
}
