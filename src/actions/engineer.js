// import Axios from 'import';

// export const fetchEngineers = () => dispatch => {
//   try {
//     dispatch(userLoginRequest());
//     Axios.post(
//       'https://boiling-basin-10755.herokuapp.com//api/v1/login',
//       user,
//     )
//       .then(response => {
//         if (response.data.logged_in) {
//           localStorage.setItem('token', response.data.token);
//           dispatch(userLoginSuccess(response.data.user));
//         }
//       })
//       .catch(error => {
//         dispatch(userLoginFailure(error.message));
//       });
//   } catch (error) {
//     dispatch(userLoginFailure(error.message));
//   }
// };
