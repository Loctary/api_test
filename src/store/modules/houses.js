const FETCH_HOUSES_PENDING = 'FETCH_HOUSES_PENDING';
const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
const FETCH_HOUSES_ERROR = 'FETCH_HOUSES_ERROR';

const initialState = {
  pending: true,
  pagination: {
    offset: 0,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HOUSES_PENDING:
      return { ...state, pending: true };
    case FETCH_HOUSES_SUCCESS:
      return { ...state, pending: false, ...action.payload };
    case FETCH_HOUSES_ERROR:
      return { pending: false, errors: action.errors };
    default:
      return state;
  }
}

export const fetchHouses = () => ({ type: FETCH_HOUSES_PENDING });
export const fetchHousesSuccess = payload => ({ type: FETCH_HOUSES_SUCCESS, payload });
export const fetchHousesError = payload => ({ type: FETCH_HOUSES_ERROR, payload });
