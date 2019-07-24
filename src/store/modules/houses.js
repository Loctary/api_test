const HOUSES_FETCH_DATA = 'HOUSES_FETCH_DATA';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case HOUSES_FETCH_DATA:
      return state;
    default:
      return state;
  }
}

export const housesFetchData = payload => ({ type: HOUSES_FETCH_DATA, payload });
