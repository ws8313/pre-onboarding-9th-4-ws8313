import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import Search from './Search';
import './table.css';

interface propsType {
  columns: any;
  data: any;
}

const PaginationTable = ({ columns, data }: propsType) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state: { pageIndex },
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 50 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className='table'>
      <Search onSubmit={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key

                <>
                  {column.Header === '주문번호' ||
                  column.Header === '거래시간' ? (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ) : (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                      <span>
                        {column.canFilter ? column.render('Filter') : null}
                      </span>
                    </th>
                  )}
                </>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className='table-pagination'
        style={{
          margin: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          <strong
            style={{ display: 'block', width: '100px', textAlign: 'center' }}
          >
            {pageIndex + 1} / {pageOptions.length}
          </strong>
        </span>
        <span>
          Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
      <div
        className='table-pagesize'
        style={{
          margin: '5px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      ></div>
    </div>
  );
};

export default PaginationTable;
