import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeFilterField,
  filterService,
  clearFilter,
} from '../actions/actionCreators';

export default function ServiceFilter() {
  const { filter } = useSelector((state) => state.serviceFilter);
  const { activeFilter } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { value } = evt.target;
    dispatch(changeFilterField(value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(filterService(filter));
  };

  const handleReset = () => {
    dispatch(clearFilter());
  };

  return (
    <label>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h3>Filter services:</h3>
        <div>Active filter: {activeFilter ? `"${activeFilter}"` : 'NO'}</div>
        <input name="filter" onChange={handleChange} value={filter} />
        <button type="submit">Set</button>
        <button type="reset">Clear</button>
      </form>
    </label>
  );
}
