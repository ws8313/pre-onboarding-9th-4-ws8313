import { ColumnsType } from 'antd/es/table';
import { ITableData } from '../../../types/ITableData';
import useTableSearch from '../useTableSearch';
import {
  filterOptionObject,
  sorterIdOptionObject,
  sorterTransactionTimeOptionObject,
  StatusRenderer,
} from './ColumnsOptions';

const ProductTableColumns = () => {
  const COLUMNS: ColumnsType<ITableData> = [
    {
      title: '주문번호',
      dataIndex: 'id',
      key: 'id',
      ...sorterIdOptionObject,
    },
    {
      title: '거래시간',
      dataIndex: 'transaction_time',
      key: 'transaction_time',
      ...sorterTransactionTimeOptionObject,
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      render: StatusRenderer,
      ...filterOptionObject,
    },
    {
      title: '고객번호',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '고객이름',
      dataIndex: 'customer_name',
      key: 'customer_name',
      ...useTableSearch('customer_name'),
    },
    {
      title: '가격',
      dataIndex: 'currency',
      key: 'currency',
    },
  ];
  return COLUMNS;
};
export default ProductTableColumns;
