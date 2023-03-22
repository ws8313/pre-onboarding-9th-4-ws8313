import { SortOrder } from "antd/es/table/interface";
import { ITableData } from "../../../types/ITableData";

type sorterType = {
  sorter: (a: ITableData, b: ITableData)=> number,
  sortDirections: SortOrder[],
}

export function StatusRenderer(val: boolean) {
  return val ? '완료' : '미완료';
}

export const filterOptionObject = {
  filters: [
    {
      text: '완료',
      value: true,
    },
    {
      text: '미완료',
      value: false,
    },
  ],
  filterMode: 'tree' as 'tree',
  filterSearch: true,
  onFilter: (value: string | number | boolean, record: ITableData) =>
    record.status === value,
}

export const sorterTransactionTimeOptionObject: sorterType = {
  sorter: (a, b) =>
    Number(new Date(a.transaction_time)) -
    Number(new Date(b.transaction_time)),
  sortDirections: ['descend'],
}

export const sorterIdOptionObject: sorterType = {
  sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend'],
}
