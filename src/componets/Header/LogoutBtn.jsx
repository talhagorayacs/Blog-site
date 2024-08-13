import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login');
    
    }
     catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      type="button"
      className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutBtn;
