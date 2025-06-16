import { EventEmitter } from "events";

type FilterCallback<T = any> = (value: T, ...args: any[]) => T;
type ActionCallback = (...args: any[]) => void;

interface Listener<T = any> {
  callback: T;
  priority?: number;
  id: number; // registration order for stable sorting
}

class FilterManager {
  private listenersMap = new Map<string, Listener<FilterCallback>[]>();
  private nextId = 0;

  addFilter<T>(
    hookName: string,
    callback: FilterCallback<T>,
    priority?: number
  ) {
    if (!this.listenersMap.has(hookName)) {
      this.listenersMap.set(hookName, []);
    }
    this.listenersMap.get(hookName)!.push({
      callback,
      priority,
      id: this.nextId++,
    });
  }

  onceFilter<T>(
    hookName: string,
    callback: FilterCallback<T>,
    priority?: number
  ) {
    const onceCallback: FilterCallback<T> = (value, ...args) => {
      this.removeFilter(hookName, onceCallback);
      return callback(value, ...args);
    };
    this.addFilter(hookName, onceCallback, priority);
  }

  removeFilter<T>(hookName: string, callback: FilterCallback<T>) {
    const listeners = this.listenersMap.get(hookName);
    if (!listeners) return;
    this.listenersMap.set(
      hookName,
      listeners.filter((l) => l.callback !== callback)
    );
  }

  applyFilters<T>(hookName: string, value: T, ...args: any[]): T {
    const listeners = this.listenersMap.get(hookName);
    if (!listeners || listeners.length === 0) return value;

    // Separate prioritized and non-prioritized
    const prioritized = listeners
      .filter((l) => l.priority !== undefined)
      .sort((a, b) => {
        if (a.priority! !== b.priority!) return a.priority! - b.priority!;
        return a.id - b.id;
      });

    const nonPrioritized = listeners.filter((l) => l.priority === undefined);

    // Run prioritized filters first
    let filteredValue = value;
    for (const listener of prioritized) {
      try {
        filteredValue =
          listener.callback(filteredValue, ...args) ?? filteredValue;
      } catch (err: any) {
        console.error(`Error in filter '${hookName}': ${err.message}`);
      }
    }

    // Then run non-prioritized filters
    for (const listener of nonPrioritized) {
      try {
        filteredValue =
          listener.callback(filteredValue, ...args) ?? filteredValue;
      } catch (err: any) {
        console.error(`Error in filter '${hookName}': ${err.message}`);
      }
    }

    return filteredValue;
  }
}

const filterManager = new FilterManager();

// Filters
export const addFilter = <T = any>(
  hookName: string,
  callback: FilterCallback<T>,
  priority?: number
) => filterManager.addFilter(hookName, callback, priority);

export const addOnceFilter = <T = any>(
  hookName: string,
  callback: FilterCallback<T>,
  priority?: number
) => filterManager.onceFilter(hookName, callback, priority);

export const removeFilter = <T = any>(
  hookName: string,
  callback: FilterCallback<T>
) => filterManager.removeFilter(hookName, callback);

export const applyFilters = <T = any>(
  hookName: string,
  value: T,
  ...args: any[]
): T => filterManager.applyFilters(hookName, value, ...args);
