import { useQuery } from 'react-query';
import { getTableData } from './apis/api';
import { MainLayout } from './layout/MainLayout';
import { MainTable } from './components/table';

export function App() {
  const { data } = useQuery('getTableData', getTableData, {
    refetchInterval: 5000,
    suspense: true,
  });

  if (!data) {
    return null;
  }

  return (
    <MainLayout>
      <MainTable />
    </MainLayout>
  );
}
