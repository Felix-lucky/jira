import { useCallback, useReducer } from "react";

enum ActionType {
  UNDO = "UNDO",
  REDO = "REDO",
  SET = "SET",
  RESET = "RESET",
}

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

interface Action<T> {
  type: ActionType;
  newPresent?: T;
}

const reducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case ActionType.UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case ActionType.REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case ActionType.SET: {
      if (newPresent === present) return state;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case ActionType.RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};

const useUndo = <T>(initialState: T) => {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: ActionType.UNDO });
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: ActionType.REDO });
    }
  }, [canRedo]);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: ActionType.SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: ActionType.RESET, newPresent }),
    []
  );

  return [state, { set, reset, redo, undo, canRedo, canUndo }] as const;
};

export default useUndo;
