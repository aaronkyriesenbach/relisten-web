import { firstBy } from 'thenby';

const REQUEST_TAPES = 'years/REQUEST_TAPES';
const RECEIVE_TAPES = 'years/RECEIVE_TAPES';

const defaultState = {};

export default function counter(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TAPES:
      return {
        ...state,
        [action.artistSlug]: {
          ...state[action.artistSlug],
          [action.showDate]: {
            data: {},
            meta: {
              loaded: false,
              loading: true,
              error: false,
            },
          },
        },
      };
    case RECEIVE_TAPES:
      return {
        ...state,
        [action.artistSlug]: {
          ...state[action.artistSlug],
          [action.showDate]: {
            data: action.data,
            meta: {
              loaded: true,
              loading: false,
              error: false,
            },
          },
        },
      };
    default:
      return state;
  }
}

const getEtreeId = (s = '') => Number(s.split('.').reverse().find(x => /^[0-9]+$/.test(x)));

// tapes: TODO: GD sort (charlie miller, sbd + etree id, weighted average), sbd + etree id, weighted avg, asc, desc
// for now, hardcode sort: sbd, charlie miller, etree id, weighted average
const sortTapes = (data = {}) => {
  const sortedTapes = data && data.sources ? [...data.sources].sort(
    firstBy(t => t.is_soundboard)
      // Charlie for GD, Pete for JRAD
      .thenBy(t => /(charlie miller)|(peter costello)/i.test([t.taper, t.transferrer, t.source].join('')))
      .thenBy((t1, t2) => getEtreeId(t1.upstream_identifier) - getEtreeId(t2.upstream_identifier))
      .thenBy(t => t.avg_rating_weighted)
  ) : [];

  return {
    ...(data || {}),
    sources: sortedTapes.reverse(),
  };
};

const compareTapes = (tape1, tape2) => {
  if (!tape1 || !tape2) {
    return tape1 ? 1 : tape2 ? -1 : 0;
  }

  var tape1Multiplier = 1;
  var tape2Multiplier = 1;

  tape1Multiplier += ((tape1.duration - tape2.duration) / tape1.duration) * 0.5;
  tape2Multiplier += ((tape2.duration - tape1.duration) / tape2.duration) * 0.5;

  return tape1.avg_rating * tape1Multiplier - tape2.avg_rating * tape2Multiplier;
};

const sortTapes2 = (data = {}) => {
  var tapes = [];
  if (data && data.sources) {
    tapes = [...data.sources];
  }

  if (tapes.some(t => t.avg_rating > 7)) {
    tapes = tapes.filter(t => t.avg_rating > 5);
  }

  tapes.sort(compareTapes);

  return { ...(data || {}), sources: tapes.reverse() };
};

export function requestTapes(artistSlug, year, showDate) {
  return {
    type: REQUEST_TAPES,
    artistSlug,
    year,
    showDate,
  };
}

export function receiveTapes(artistSlug, year, showDate, data) {
  return {
    type: RECEIVE_TAPES,
    artistSlug,
    year,
    showDate,
    data: sortTapes2(data),
  };
}

export function fetchTapes(artistSlug, year, showDate) {
  return (dispatch, getState) => {
    const state = getState().tapes[artistSlug];

    if (state && state[showDate] && state[showDate].meta.loaded) return {};

    dispatch(requestTapes(artistSlug, year, showDate));

    return fetch(`https://relistenapi.alecgorge.com/api/v2/artists/${artistSlug}/years/${year}/${showDate}`)
      .then(res => res.json())
      .then(json => dispatch(receiveTapes(artistSlug, year, showDate, json)));
  };
}
