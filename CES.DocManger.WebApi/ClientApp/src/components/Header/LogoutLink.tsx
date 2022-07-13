import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import logout from '../../redux/actions/logoutRedux';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { RootState } from '../../redux/store/reducers/combineReducers';
import { setEmail, setToken, setUserName } from '../../redux/store/reducers/loginReducer';
import { UserState } from '../../types/UserTypes';

export default function LogoutLink() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    async function logOut() {
      await dispatch(logout(user.email));
      dispatch(setUserName(''));
      dispatch(setToken(''));
      dispatch(setEmail(''));
      navigate('/login', { replace: true, state: { from: '/' } });
    }
    logOut().catch(() => console.error('Error'));
  };

  return (
    <div className="logout-link">
      <p>
        Привет,
        {user.userName}
      </p>
      <button type="button" onClick={handleClick}>
        <svg viewBox="0 0 512 512">
          <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
        </svg>
      </button>
    </div>
  );
}
