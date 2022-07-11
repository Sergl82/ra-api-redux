import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchServicesSuccess,
  fetchServicesRequest,
  fetchServicesFailed,
  removeService,
} from '../actions/actionCreators';
import ServiceAdd from './ServiceAdd';
import ServiceFilter from './ServiceFilter';
import Loader from './Loader';

const url = process.env.REACT_APP_API_URL_BUILD;

export const fetchGetServices = (dispatch) => {
  dispatch(fetchServicesRequest());
  return fetch(url)
    .then((response) => {
      // console.log('fetchGetServices_response: ', response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      return response.json();
    })
    .then((result) => {
      // console.log('fetchGetServices_result: ', result);
      dispatch(fetchServicesSuccess(result));
    })
    .catch((e) => {
      // console.log('fetchServices_Get_Error_text: ', e.message);
      dispatch(fetchServicesFailed(e.message));
    });
};

const fetchRemoveService = (dispatch, id) => {
  dispatch(removeService(id));
  return fetch(url + '/' + id, {
    method: 'DELETE',
  })
    .then((response) => {
      // console.log('fetchDeleteService_response: ', response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      fetchGetServices(dispatch);
    })
    .catch((e) => {
      // console.log('fetchDeleteServicet_Error_text: ', e.message);
      dispatch(fetchServicesFailed(e.message));
    });
};

export default function ServiceList() {
  const { services, activeFilter, loading, error } = useSelector(
    (state) => state.serviceList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGetServices(dispatch);
  }, [dispatch]);

  const handleRemove = (id) => {
    fetchRemoveService(dispatch, id);
  };

  const handleEdit = (id) => {
    if (id) navigate('/services/' + id);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(activeFilter.toLowerCase())
  );
  const items = filteredServices.length ? filteredServices : services;
  const itemsList = items.map((o) => (
    <li key={o.id}>
      {o.name} {o.price}
      <button disabled={o.loading} onClick={() => handleEdit(o.id)}>
        ✎
      </button>
      <button disabled={o.loading} onClick={() => handleRemove(o.id)}>
        ✕
      </button>
    </li>
  ));

  return (
    <>
      <ServiceAdd />
      <ServiceFilter />
      {(loading && <Loader />) || error || (
        <ul>
          {!filteredServices.length && activeFilter
            ? 'Nothing to display. Try another filter string!'
            : itemsList}
        </ul>
      )}
    </>
  );
}
