import React, { useState, useMemo, useEffect } from 'react';
import getData from './api/getData';
import PaginationTable from './components/Table';
import { tableType } from './types/tableTypes';

function SelectColumnFilter({ column }: any) {
  const { filterValue, setFilter, preFilteredRows, id } = column;
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: { values: { [x: string]: unknown } }) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function App() {
  const [tableData, setTableData] = useState<tableType[] | undefined>();
  const COLUMNS = [
    {
      accessor: 'id',
      Header: '주문번호',
    },
    {
      accessor: 'transaction_time',
      Header: '거래시간',
    },
    {
      accessor: 'status',
      Header: '주문처리상태',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      accessor: 'customer_id',
      Header: '고객번호',
      Filter: '',
      filter: '',
    },
    {
      accessor: 'customer_name',
      Header: '고객이름',
      Filter: '',
      filter: '',
    },
    {
      accessor: 'currency',
      Header: '가격',
      Filter: '',
      filter: '',
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const TODAY = '2023-03-08';

  tableData?.forEach((e) => {
    e.status = e.status ? '완료' : '처리중';
  });

  const todayData = tableData?.filter((e: { transaction_time: string }) => {
    if (e.transaction_time.split(' ')[0] === TODAY) {
      return e;
    }
  });

  useEffect(() => {
    getData().then((res) => {
      setTableData(res?.data);
    });
  }, []);

  return (
    <>{tableData && <PaginationTable columns={columns} data={todayData} />}</>
  );
}
