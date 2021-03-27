import { ReceivedData } from "../../models/ReceivedData";
import { Year } from "../../models/Year";

const REQUEST_YEARS = 'years/REQUEST_YEARS';
const RECEIVE_YEARS = 'years/RECEIVE_YEARS';

const defaultState = {
};

export default function counter(state = defaultState, action: any) {
  switch (action.type) {
    case REQUEST_YEARS:
      return {
        ...state,
        [action.artistSlug]: {
          data: [],
          meta: {
            loaded: false,
            loading: true,
            error: false,
          },
        },
      };
    case RECEIVE_YEARS:
      return {
        ...state,
        [action.artistSlug]: {
          data: Array.isArray(action.data) ? action.data : [],
          meta: {
            loaded: true,
            loading: false,
            error: false,
          },
        } as ReceivedData<Year>,
      };
    default:
      return state;
  }
}

export function requestYears(artistSlug: string) {
  return {
    type: REQUEST_YEARS,
    artistSlug,
  };
}

export function receiveYears(artistSlug: string, data: Year[]) {
  return {
    type: RECEIVE_YEARS,
    artistSlug,
    data,
  };
}

export function fetchYears(artistSlug: string) {
  return (dispatch: any, getState: any) => {
    const state = getState().years[artistSlug];
    if (state && state.meta.loaded) return {};
    dispatch(requestYears(artistSlug));
    return fetch(`https://relistenapi.alecgorge.com/api/v2/artists/${artistSlug}/years`)
      .then(res => res.json())
      .then(json => dispatch(receiveYears(artistSlug, json)));
  };
}
