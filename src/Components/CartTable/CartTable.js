import { useMemo } from 'react'
import { useTable } from 'react-table'



export const CartTable = () => {

  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: <img src='https://i.ytimg.com/vi/UdGTQ_tLPEg/maxresdefault.jpg' className='w-16'/>
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Producto',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Plataforma',
        accessor: 'col2',
      },
      {
        Header: 'Entrega',
        accessor: 'col3',
      },
      {
        Header: 'Precio',
        accessor: 'col4',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue', width:"100%" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px blue',
                  background: '#161b22',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}