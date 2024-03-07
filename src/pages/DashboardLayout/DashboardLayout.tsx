import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardLayout: FC = () => {
  return (
    <main>
      <Sidebar />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
