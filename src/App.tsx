import { useQuery } from 'react-query';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
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
    <ConfigProvider locale={koKR}>
      <MainLayout>
        <MainTable />
      </MainLayout>
    </ConfigProvider>
  );
}
