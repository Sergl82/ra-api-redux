import { CHANGE_FILTER_FIELD, CLEAR_FILTER } from '../actions/actionTypes';

const initialState = {
  filter: '',
};

export default function serviceFilterReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER_FIELD:
      const { filter } = action.payload;
      return { ...state, filter };
    case CLEAR_FILTER:
      return { ...initialState };
    default:
      return state;
  }
}
