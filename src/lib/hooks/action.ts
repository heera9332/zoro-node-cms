import { EventEmitter } from "events";

type FilterCallback<T = any> = (value: T, ...args: any[]) => T;
type ActionCallback = (...args: any[]) => void;

interface Listener<T = any> {
  callback: T;
  priority?: number;
  id: number; // registration order for stable sorting
}

class ActionManager {
  private listenersMap = new Map<string, Listener<ActionCallback>[]>();
  private nextId = 0;

  addAction(hookName: string, callback: ActionCallback, priority?: number) {
    if (!this.listenersMap.has(hookName)) {
      this.listenersMap.set(hookName, []);
    }
    this.listenersMap.get(hookName)!.push({
      callback,
      priority,
      id: this.nextId++,
    });
  }

  onceAction(hookName: string, callback: ActionCallback, priority?: number) {
    const onceCallback: ActionCallback = (...args) => {
      this.removeAction(hookName, onceCallback);
      callback(...args);
    };
    this.addAction(hookName, onceCallback, priority);
  }

  removeAction(hookName: string, callback: ActionCallback) {
    const listeners = this.listenersMap.get(hookName);
    if (!listeners) return;
    this.listenersMap.set(
      hookName,
      listeners.filter((l) => l.callback !== callback)
    );
  }

  doAction(hookName: string, ...args: any[]) {
    const listeners = this.listenersMap.get(hookName);
    if (!listeners) return;

    const prioritized = listeners
      .filter((l) => l.priority !== undefined)
      .sort((a, b) => {
        if (a.priority! !== b.priority!) return a.priority! - b.priority!;
        return a.id - b.id;
      });

    const nonPrioritized = listeners.filter((l) => l.priority === undefined);

    for (const listener of prioritized) {
      try {
        listener.callback(...args);
      } catch (err: any) {
        console.error(`Error in action '${hookName}': ${err.message}`);
      }
    }

    for (const listener of nonPrioritized) {
      try {
        listener.callback(...args);
      } catch (err: any) {
        console.error(`Error in action '${hookName}': ${err.message}`);
      }
    }
  }
}

const actionManager = new ActionManager();

// Actions
export const addAction = (
  hookName: string,
  callback: ActionCallback,
  priority?: number
) => actionManager.addAction(hookName, callback, priority);

export const addOnceAction = (
  hookName: string,
  callback: ActionCallback,
  priority?: number
) => actionManager.onceAction(hookName, callback, priority);

export const removeAction = (hookName: string, callback: ActionCallback) =>
  actionManager.removeAction(hookName, callback);

export const doAction = (hookName: string, ...args: any[]) =>
  actionManager.doAction(hookName, ...args);
