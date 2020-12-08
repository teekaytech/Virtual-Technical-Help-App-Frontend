import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchEngineers from '../actions/engineers';
import home from '../css/home.module.scss';
import Spinner from '../components/Spinner';

const EngineerList = ({ loading, engineers, fetchAllEngineers }) => {
  useEffect(() => {
    fetchAllEngineers();
  }, [fetchAllEngineers]);

  const allEngineers = engineers && engineers.length > 0 ? (
    engineers.map(engineer => (
      <div className="col mb-4" key={engineer.id}>
        <article className="card text-center">
          <img
            src={engineer.avatar_link}
            className="card-img-top"
            alt={engineer.name}
          />
          <h5 className="card-title text-uppercase mt-2">{engineer.name}</h5>
          <p className="card-text">{engineer.stack}</p>
          <Link to={`/engineers/${engineer.id}`} className="btn btn-primary">
            View Details
          </Link>
        </article>
      </div>
    ))
  ) : (
    <p>There are currently no engineer available. please check later. </p>
  );

  if (loading) {
    return <p><Spinner /></p>;
  }

  return (
    <div className={home.home}>
      <h4 className="font-weight-bold text-center mb-5 text-uppercase">
        All Engineers List
        <small className="text-muted push-right text-lowercase d-block">
          Please select an engineer to see details
        </small>
      </h4>
      <div className="row row-cols-1 row-cols-md-2">{allEngineers}</div>
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
