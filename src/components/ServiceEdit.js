import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEditField,
  clearForm,
  editServicesRequest,
  editServicesFailed,
  editServicesSuccess,
} from '../actions/actionCreators';
import Loader from './Loader';

const url = process.env.REACT_APP_API_URL_BUILD;

const fetchPostEditServices = (item, dispatch, navigate) => {
  console.log('fetchPostEditServices_item: ', item);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...item }),
  })
    .then((result) => {
      console.log(result);
      if (!result.ok) {
        console.log(
          'ServiceForm_handleSubmit_fetchServices_result.statusText:',
          result.status,
          result.statusText
        );
      }
      if (result.status < 200 || result.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      dispatch(editServicesSuccess());
      navigate('/');
    })
    .catch((e) => {
      console.log(
        'ServiceForm_handleSubmit_fetchServices_Error_text: ',
        e.message
      );
      dispatch(editServicesFailed(e.message));
    });
};

const fetchGetEditServices = (dispatch, id) => {
  dispatch(editServicesRequest());
  return fetch(url + '/' + id)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      return response.json();
    })
    .then((result) => {
      dispatch(editServicesSuccess(result));
    })
    .catch((e) => {
      console.log('fetchServices_Get_Error_text: ', e.message);
      dispatch(editServicesFailed(e.message));
    });
};

export default function ServiceEdit() {
  const { item, loading, error } = useSelector((state) => state.serviceEdit);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGetEditServices(dispatch, params.id);
  }, [dispatch, params.id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeEditField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!item.name || !item.price || item.price <= 0) return;
    dispatch(editServicesRequest());
    fetchPostEditServices({ ...item }, dispatch, navigate);
  };

  const handleReset = (evt) => {
    dispatch(clearForm());
    navigate('/');
  };

  return (
    (loading && <Loader />) ||
    error || (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h3>Edit service:</h3>
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
        <label>
          Content
          <input name="content" onChange={handleChange} value={item.content} />
        </label>
        <button
          type="submit"
          disabled={loading || !item.name || !item.price || item.price <= 0}
        >
          Save
        </button>
        <button type="reset" disabled={loading}>
          Close
        </button>
        <div>{error}</div>
      </form>
    )
  );
}
