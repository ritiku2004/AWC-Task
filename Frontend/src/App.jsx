import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import { checkStatus } from './features/auth/services/authApi';
import { loginSuccess, authError, setAuthLoading } from './store/slices/authSlice';
import Spinner from './components/ui/Spinner';

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(setAuthLoading());
    checkStatus()
      .then(response => {
        dispatch(loginSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(authError());
      });
  }, [dispatch]);

  if (authStatus === 'loading' || authStatus === 'idle') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AppRoutes />
    </div>
  );
}

export default App;