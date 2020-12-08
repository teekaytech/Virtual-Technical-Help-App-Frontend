/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fetchEngineers from '../actions/engineers';
import home from '../css/home.module.scss';
import Spinner from '../components/Spinner';

const EngineerList = ({ loading, engineers, fetchAllEngineers }) => {
  useEffect(() => {
    fetchAllEngineers();
  }, [fetchAllEngineers]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
  };
  const allEngineers = engineers && engineers.length > 0 ? (
    <Slider {...settings}>
      { engineers.map(engineer => (
        <article className="card text-center px-3" key={engineer.id}>
          <img
            src={engineer.avatar_link}
            className="card-img-top"
            alt={engineer.name}
          />
          <h5 className="card-title text-uppercase mt-2">{engineer.name}</h5>
          <p className="card-text">{engineer.stack}</p>
          <Link to={`/engineers/${engineer.id}`} className="btn btn-success">
            View Details
          </Link>
        </article>
      )) }
    </Slider>
  ) : (
    <p>There are currently no engineer available. please check later. </p>
  );

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className={home.home}>
      <h4 className="font-weight-bold text-center mb-5 text-uppercase">
        All Engineers List
        <small className="text-muted push-right text-lowercase d-block">
          Please select an engineer to see details
        </small>
      </h4>
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
