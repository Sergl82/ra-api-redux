import {
  REMOVE_SERVICE,
  FILTER_SERVICE,
  CLEAR_FILTER,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
  FETCH_SERVICES_REQUEST,
} from '../actions/actionTypes';

const initialState = {
  services: [],
  activeFilter: '',
  loading: false,
  error: null,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SERVICES_SUCCESS:
      const { services } = action.payload;
      return { ...state, loading: false, services };
    case FETCH_SERVICES_FAILED:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case REMOVE_SERVICE:
      const { id } = action.payload;
      const service = state.services.find((o) => o.id === id);      
      if (service) {
        service.loading = true;
      };
      return {
        ...state,
      };
    case FILTER_SERVICE:
      const { setFilter } = action.payload;
      return {
        ...state,
        activeFilter: setFilter,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        activeFilter: initialState.activeFilter,
      };
    default:
      return state;
  }
}
