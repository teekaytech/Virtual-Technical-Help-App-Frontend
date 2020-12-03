import React from 'react';
// import PropTypes from 'prop-types';

const Engineer = props => (
  <div>
    Individual Engineer
    {console.log(props)}
  </div>
);

// Engineer.defaultProps = {
//   engineer: PropTypes.func,
// };

// Engineer.propTypes = {
//   engineer: PropTypes.arrayOf(Object).isRequired,
// };

export default Engineer;
