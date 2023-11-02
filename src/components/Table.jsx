import DataTable from "react-data-table-component";

function Table({ tableHeaders, tableDetails }) {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "white",
        color: "black",
      },
    },
    rows: {
      style: {
        backgroundColor: "white",
        color: "black",
      },
    },
    pagination: {
      style: {
        backgroundColor: "white",
        color: "black",
      },
    },
    cell: {
      style: {
        // backgroundColor: "red",
      },
    },
  };
  return (
    <DataTable
      columns={tableHeaders}
      data={tableDetails}
      selectableRows
      pagination
      customStyles={customStyles}
    />
  );
}

export default Table;
