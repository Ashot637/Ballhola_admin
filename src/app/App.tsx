import { useEffect, type FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, publicRoutes } from '../routes/routes';
import ProtectedRoute from '../routes/ProtectedRoute';
import { fetchAuthMe, selectAuth } from '../store/authSlice';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';


const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  const { user, status } = useSelector(selectAuth);


  return (
    <div className="container h-100">
      <Suspense>
      <Routes>
        {publicRoutes.map(({ path, Element }) => {
          return <Route key={path} path={path} element={<Element />} />;
        })}

        <Route path="/" element={<ProtectedRoute />}>
          {user && adminRoutes.map(({ path, Element, children }) => {
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
