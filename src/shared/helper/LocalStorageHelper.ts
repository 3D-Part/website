export class LocalStorageHelper {
  // Save item to localStorage
  static saveItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Get item from localStorage
  static getItem(key: string): any {
    try {
      const serializedValue = localStorage.getItem(key);
      console.log(serializedValue);
      if (serializedValue === null) {
        return undefined;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return undefined;
    }
  }

  // Remove item from localStorage
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  // Clear the entire localStorage
  static clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
