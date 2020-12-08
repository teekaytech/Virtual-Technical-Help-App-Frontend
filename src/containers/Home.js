import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../css/home.module.scss';
import { logout } from '../actions/auth';

function Home({ userName, logout }) {
  return (
    <section className={styles.home}>
      <h3 className="d-flex justify-content-between">
        Welcome,
        {' '}
        {userName}
        <small className="text-muted push-right">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => logout()}
          >
            Logout
          </button>
        </small>
      </h3>
      <p className="font-weight-bolder font-italic">
        To get started, you can perform the following activities from the
        sidenav:
      </p>
      <ul className="list-unstyled">
        <li className="">
          <span role="img" aria-label="emoji">
            &#128221;
          </span>
          {' '}
          Check for the list of available engineers
        </li>
        <li>
          <span role="img" aria-label="emoji">
            &#128221;
          </span>
          {' '}
          View details of each engineer
        </li>
        <li>
          <span role="img" aria-label="emoji">
            &#128221;
          </span>
          {' '}
          Book an appointment with a TSE
        </li>
        <li>
          <span role="img" aria-label="emoji">
            &#128221;
          </span>
          {' '}
          Check all appointments
        </li>
      </ul>
      <p className="font-italic font-weight-bold text-right">...all the best!</p>
    </section>
  );
}

Home.propTypes = {
  userName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userName: state.auth.user.name,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
