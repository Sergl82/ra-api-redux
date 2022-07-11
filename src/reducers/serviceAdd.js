import {
  ADD_SERVICES_FAILED,
  ADD_SERVICES_REQUEST,
  ADD_SERVICES_SUCCESS,
  CHANGE_ADD_FIELD,
  CLEAR_FORM,
} from '../actions/actionTypes';

const initialState = {
  item: {
    name: '',
    price: '',
  },
  loading: false,
  error: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ADD_FIELD:
      const { name, value } = action.payload;
      return { ...state, item: { ...state.item, [name]: value } };
    case CLEAR_FORM:
      return { ...state, item: initialState.item};
    case ADD_SERVICES_SUCCESS:
      return { ...initialState };
    case ADD_SERVICES_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_SERVICES_FAILED:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
