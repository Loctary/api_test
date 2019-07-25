const FETCH_HOUSES_PENDING = 'FETCH_HOUSES_PENDING';
const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
const FETCH_HOUSES_ERROR = 'FETCH_HOUSES_ERROR';

const pagination = {
  total: 0,
  offset: 0,
};

const initialState = {
  errors: null,
  pending: true,
  pagination,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HOUSES_PENDING:
      return { ...state, pending: true };
    case FETCH_HOUSES_SUCCESS:
      return { ...state, pending: false, ...action.payload, errors: null };
    case FETCH_HOUSES_ERROR:
      return { pending: false, errors: action.payload.errors, pagination };
    default:
      return state;
  }
}

export const fetchHouses = () => ({ type: FETCH_HOUSES_PENDING });
export const fetchHousesSuccess = payload => ({ type: FETCH_HOUSES_SUCCESS, payload });
export const fetchHousesError = payload => ({ type: FETCH_HOUSES_ERROR, payload });
