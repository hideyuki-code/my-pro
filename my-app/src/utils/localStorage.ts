export const getItem = <T>(key: string): T | null => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

export const setItem = <T>(key: string, value: T): boolean => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
    return false;
  }
};

export const removeItem = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}; 