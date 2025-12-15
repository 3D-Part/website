export class LocalStorageHelper {
  // Save item to localStorage
  static saveItem(key: string, value: any): void {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Get item from localStorage
  static getItem(key: string): any {
    try {
      if (typeof window === "undefined" || !window.localStorage) return undefined;
      const serializedValue = window.localStorage.getItem(key);
      if (serializedValue === null) return undefined;
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return undefined;
    }
  }

  // Remove item from localStorage
  static removeItem(key: string): void {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  // Clear the entire localStorage
  static clearStorage(): void {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
