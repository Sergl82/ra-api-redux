import {
  REMOVE_SERVICE,
  FILTER_SERVICE,
  CHANGE_ADD_FIELD,
  CHANGE_EDIT_FIELD,
  CHANGE_FILTER_FIELD,
  CLEAR_FORM,
  CLEAR_FILTER,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
  FETCH_SERVICES_REQUEST,
  ADD_SERVICES_SUCCESS,
  ADD_SERVICES_FAILED,
  ADD_SERVICES_REQUEST,
  EDIT_SERVICES_SUCCESS,
  EDIT_SERVICES_FAILED,
  EDIT_SERVICES_REQUEST,
} from './actionTypes';

export function removeService(id) {
  return { type: REMOVE_SERVICE, payload: { id } };
}

export function filterService(setFilter) {
  return { type: FILTER_SERVICE, payload: { setFilter } };
}

export function changeAddField(name, value) {
  return { type: CHANGE_ADD_FIELD, payload: { name, value } };
}

export function changeEditField(name, value) {
  return { type: CHANGE_EDIT_FIELD, payload: { name, value } };
}

export function changeFilterField(filter) {
  return { type: CHANGE_FILTER_FIELD, payload: { filter } };
}

export function clearForm() {
  return { type: CLEAR_FORM };
}

export function clearFilter() {
  return { type: CLEAR_FILTER };
}

export function fetchServicesRequest() {
  return { type: FETCH_SERVICES_REQUEST };
}

export function fetchServicesSuccess(services) {
  return { type: FETCH_SERVICES_SUCCESS, payload: { services } };
}

export function fetchServicesFailed(error) {
  return { type: FETCH_SERVICES_FAILED, payload: { error } };
}

export function addServicesRequest() {
  return { type: ADD_SERVICES_REQUEST };
}

export function addServicesSuccess() {
  return { type: ADD_SERVICES_SUCCESS };
}

export function addServicesFailed(error) {
  return { type: ADD_SERVICES_FAILED, payload: { error } };
}

export function editServicesRequest() {
  return { type: EDIT_SERVICES_REQUEST };
}

export function editServicesSuccess(item) {
  return { type: EDIT_SERVICES_SUCCESS, payload: { item } };
}

export function editServicesFailed(error) {
  return { type: EDIT_SERVICES_FAILED, payload: { error } };
}
