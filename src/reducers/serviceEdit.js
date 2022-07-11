import {
  EDIT_SERVICES_FAILED,
  EDIT_SERVICES_REQUEST,
  EDIT_SERVICES_SUCCESS,
  CHANGE_EDIT_FIELD,
  CLEAR_FORM,
} from '../actions/actionTypes';

const initialState = {
  item: {
    id: '',
    name: '',
    price: '',
    content: '',
  },
  loading: false,
  error: null,
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EDIT_FIELD:
      const { name, value } = action.payload;
      return { ...state, item: { ...state.item, [name]: value } };
    case CLEAR_FORM:
      return { ...state, item: initialState.item };
    case EDIT_SERVICES_SUCCESS:
      const { item } = action.payload;
      if (!item) return {...initialState};
      return { ...state, loading: false, item };
    case EDIT_SERVICES_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_SERVICES_FAILED:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
