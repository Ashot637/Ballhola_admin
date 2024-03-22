import { useEffect, type FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, publicRoutes } from '../routes/routes';
import ProtectedRoute from '../routes/ProtectedRoute';
import { fetchAuthMe } from '../store/authSlice';
import { useAppDispatch } from '../store/store';
import Spinner from '../UI/Spinner/Spinner';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="container h-100">
      <Suspense>
      <Routes>
        {publicRoutes.map(({ path, Element }) => {
          return <Route key={path} path={path} element={<Element />} />;
        })}

        <Route path="/" element={<ProtectedRoute />}>
          {adminRoutes.map(({ path, Element, children }) => {
            if (children?.length) {
              return (
                <Route key={path} path={path} element={<Element />}>
                  {children.map(({ path, Element }) => {
                    return <Route key={path} path={path} element={<Element />} />;
                  })}
                </Route>
              );
            }
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Route>
      </Routes>
      </Suspense>
    </div>
  );
};

export default App;
