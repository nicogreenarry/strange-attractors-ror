import axios from 'axios';

/* Constants */
export const ACTION_TYPES = {
  back: 'back',
  forward: 'forward',
  requestingAttractor: 'requesting_attractor',
};
export const KINDS = {
  attractor: 'attractor',
  tweakedAttractor: 'tweaked_attractor',
};

/* Actions */
export async function fetchRandomFeaturedAttractor() {
  const res = await axios.get('/attractors/featured/random');
  const attractor = res.data;
  if (!attractor) {
    return null;
  }
  attractor.details = JSON.parse(attractor.details);
  return {
    id: attractor.id,
    ...attractor.details,
  };
}

/* Reducer */

/*
  type Action = {
    // Represents navigating forward
    type: 'forward';
    next: HistoryItem;
    // `request` should be supplied if the `next` came from a network request. That allows the
    // reducer to disregard it if another history item was added after this one was requested.
    request?: Promise<etc>;
  } | {
    // Represents navigating back to the previous history item
    type: 'back';
  } | {
    // Stores a pending request for an attractor
    type: 'requesting_attractor';
    request: Promise<etc>;
  }

  interface HistoricalAttractor {
    coefficients: number[]; // 12 coefficients
    startXy: [number, number];
    id?: number; // Include this if it's a persisted attractor
  }
  type HistoryItem = {
    kind: typeof KINDS.attractor;
    attractor: HistoricalAttractor;
  } | {
    kind: typeof KINDS.tweakedAttractor;
    // `attractor` is the attractor which was tweaked to generate the tweaked attractors.
    attractor: {
      coefficients: number[]; // 12 coefficients
      startXy: [number, number];
      id?: number; // Include this if it's a persisted attractor
    };
    // TODO: figure out how to implement this. When the user first clicks the Tweak button, we can
        immediately set `kind` and `attractor` as the current history item, but we need the
        TweakedAttractor component to actually create the variants. So we'll likely need to pass
        dispatch down to TweakedAttractor, and have a new action type like
        'setCurrentTweakedVariants', so TweakedAttractor can pass the variants into historyState
        once it creates them.
        For now, since we haven't implemented a "back" button, we haven't implemented this.
    // variants: HistoricalAttractor[]; // 9 specifically, though we might relax that requirement eventually
  }
 */
export const initialHistoryState = {
  // Holds the current history state, e.g. an attractor or a set of tweaked attractor variants
  current: null,
  // Holds past history states
  history: [],
  // When there's a network request for an attractor, the promise will be stored here. When there's
  // an outstanding request that should be ignored (e.g. because some other button was pressed in
  // the meantime), this should be set to null.
  request: null
};
export function historyReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.forward:
      // See explanation in documentation on the `request` action prop.
      if (action.request && action.request !== state.request) {
        return state;
      }
      // If the next history item is a tweaked_attractor, and no attractor is supplied, that
      // mean we should tweak the attractor already in state. This would happen if the user clicked
      // the sidebar button to tweak the current attractor. If they click the "Tweak" button on
      // a tweaked variant, then the component containing that button should include the variant
      // to be tweaked.
      if (action.next && action.next.kind === KINDS.tweakedAttractor) {
        action.next.attractor = action.next.attractor || state.current.attractor;
      }
      return {
        history: [...state.history, state.current],
        current: action.next,
        request: null,
      };
    case ACTION_TYPES.back:
      const current = state.history.pop();
      return {
        history: [...state.history],
        current,
        request: null,
      };
    case ACTION_TYPES.requestingAttractor:
      return {...state, request: action.request};
    default:
      throw Error(`Unsupported action ${action.type} dispatched to historyReducer`);
  }
}
