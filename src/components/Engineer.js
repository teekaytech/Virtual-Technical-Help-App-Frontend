import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrentEngineer from '../actions/engineer';
import Appointment from './Appointment';
import home from '../css/home.module.scss';
import Spinner from './Spinner';

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
    <section className={home.engineer}>
      <div className={home.engineerImg}>
        <img
          src={engineer.avatar_link}
          alt="Engineer Img"
          className="img-fluid rounded"
        />
      </div>
      <aside className="text-right">
        <h5 className="font-weight-bold mb-3 text-uppercase">
          {engineer.name}
        </h5>
        <p>
          Stack:
          {' '}
          {engineer.stack}
        </p>
        <p>
          Location:
          {' '}
          {engineer.location}
        </p>
        <Appointment engineerId={engineer.id} />
      </aside>
    </section>
  ) : (
    <div className="text-center"><Spinner /></div>
  );

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className={home.home}>
      <h4 className="font-weight-bold mb-5 text-uppercase">
        Engineer Details
      </h4>
      {thisEngineer}
    </section>
  );
};

Engineer.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCurrentEngineer: PropTypes.func.isRequired,
  engineer: PropTypes.shape({
    id: PropTypes.number,
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
