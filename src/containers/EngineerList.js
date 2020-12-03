import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchEngineers from '../actions/engineers';

const EngineerList = ({ loading, engineers, fetchAllEngineers }) => {
  useEffect(() => {
    fetchAllEngineers();
  }, [fetchAllEngineers]);

  const allEngineers = engineers && engineers.length > 0 ? (
    engineers.map(engineer => (
      <article key={engineer.id}>
        <h3>
          Name:
          {' '}
          {engineer.name}
        </h3>
        <p>
          Stack:
          {' '}
          {engineer.stack}
        </p>
        <Link to={`/engineers/${engineer.id}`}>View Details</Link>
      </article>

    ))
  ) : (
    <p>There are currently no engineer available. please check later. </p>
  );

  if (loading) {
    return <p>Fetching engineers ...</p>;
  }

  return (
    <div>
      <h4>All Engineers List</h4>
      {allEngineers}
    </div>
  );
};

EngineerList.defaultProps = {
  fetchAllEngineers: PropTypes.func,
};

EngineerList.propTypes = {
  fetchAllEngineers: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  engineers: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  loading: state.engineers.loading,
  engineers: state.engineers.engineers,
});

const mapDispatchToProps = dispatch => ({
  fetchAllEngineers: () => dispatch(fetchEngineers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EngineerList);
