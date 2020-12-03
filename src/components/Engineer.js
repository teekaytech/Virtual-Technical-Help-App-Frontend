import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrentEngineer from '../actions/engineer';

const Engineer = ({
  loading, engineer, fetchCurrentEngineer, match,
}) => {
  useEffect(
    () => {
      fetchCurrentEngineer(match.params.id);
    },
    [fetchCurrentEngineer, match.params.id],
  );

  const thisEngineer = Object.keys(engineer).length ? (
    <section>
      <p>
        Name:
        {' '}
        {engineer.name}
      </p>
      <p>
        Stack:
        {' '}
        { engineer.stack}
      </p>
      <p>
        Location
        {' '}
        { engineer.location }
      </p>
      <img src={engineer.avatar_link} alt="Engineer Img" />
      <button type="button">
        Book Appointment with
        {' '}
        { engineer.name }
      </button>
    </section>
  ) : (
    <p>Fetching engineer...</p>
  );

  if (loading) {
    return (<p>Fetching engineer...</p>);
  }
  return (
    <div>
      Individual Engineer
      {thisEngineer}
    </div>
  );
};

Engineer.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCurrentEngineer: PropTypes.func.isRequired,
  engineer: PropTypes.shape({
    name: PropTypes.string,
    stack: PropTypes.string,
    location: PropTypes.string,
    avatar_link: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: state.engineers.loading,
  engineer: state.engineer.engineer,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentEngineer: engineerId => dispatch(fetchCurrentEngineer(engineerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Engineer);
