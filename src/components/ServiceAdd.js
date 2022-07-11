import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeAddField,
  clearForm,
  addServicesRequest,
  addServicesFailed,
  addServicesSuccess,
} from '../actions/actionCreators';
import { fetchGetServices } from './ServiceList';

const url = process.env.REACT_APP_API_URL_BUILD;

const fetchPostServices = (dispatch, item) => {
  console.log('fetchServices_item: ', item);
  dispatch(addServicesRequest());
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...item, id: 0 }),
  })
    .then((result) => {
      console.log(result);
      if (!result.ok) {
        console.log(
          'ServiceForm_handleSubmit_fetchServices_result:',
          result.status,
          result.statusText
        );
      }
      if (result.status < 200 || result.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      dispatch(addServicesSuccess());
      fetchGetServices(dispatch);
    })
    .catch((e) => {
      console.log(
        'ServiceForm_handleSubmit_fetchServices_Error_text: ',
        e.message
      );
      dispatch(addServicesFailed(e.message));
    });
};

export default function ServiceAdd() {
  const { item, loading, error } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeAddField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!item.name || !item.price || item.price <= 0) return;
    fetchPostServices(dispatch, {
      ...item,
      id: 0,
    });
  };

  const handleReset = (evt) => {
    dispatch(clearForm());
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h3>Add service:</h3>
      <label>
        Name <input name="name" onChange={handleChange} value={item.name} />
      </label>
      <label>
        Price
        <input
          name="price"
          type="number"
          onChange={handleChange}
          value={item.price}
        />
      </label>
      <button
        type="submit"
        disabled={loading || !item.name || !item.price || item.price <= 0}
      >
        Save
      </button>
      <button type="reset" disabled={loading}>
        Cancel
      </button>
      <div>{error}</div>
    </form>
  );
}
