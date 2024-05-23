export function useEnv() {
  const { VITE_API_URL, MODE } = import.meta.env;
  return {
    VITE_API_URL,
    MODE
  };
}
