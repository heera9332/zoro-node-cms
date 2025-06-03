/**
 * @author: Heera Singh
 * @date: 22-03-2025
 * @description: Hooks features like WordPress
 */

import { EventEmitter } from "events";

// Event emitter for action hooks
const eventEmitter = new EventEmitter();

type FilterCallback<T = any> = (value: T, ...args: any[]) => T;

class FilterManager extends EventEmitter {
  applyFilters<T>(hookName: string, value: T, ...args: any[]): T {
    let filteredValue = value;
    this.listeners(hookName).forEach((callback) => {
      try {
        filteredValue =
          (callback as FilterCallback<T>)(filteredValue, ...args) ||
          filteredValue;
      } catch (error: any) {
        console.error(`Error in filter '${hookName}': ${error.message}`);
      }
    });
    return filteredValue;
  }
}

const filterManager = new FilterManager();

/** Filter Hooks */
export const addFilter = <T = any>(
  hookName: string,
  callback: FilterCallback<T>
) => filterManager.on(hookName, callback);

export const applyFilters = <T = any>(
  hookName: string,
  value: T,
  ...args: any[]
): T => filterManager.applyFilters(hookName, value, ...args);

/** Action Hooks */
export const addAction = (
  hookName: string,
  callback: (...args: any[]) => void
) => eventEmitter.on(hookName, callback);

export const doAction = (hookName: string, ...args: any[]) =>
  eventEmitter.emit(hookName, ...args);

/** Optional: Add single execution actions/filters */
export const addOnceAction = (
  hookName: string,
  callback: (...args: any[]) => void
) => eventEmitter.once(hookName, callback);

export const addOnceFilter = <T = any>(
  hookName: string,
  callback: FilterCallback<T>
) => filterManager.once(hookName, callback);
