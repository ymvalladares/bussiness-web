import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Product Name", width: 250 },
  { field: "price", headerName: "Unit Price", width: 130 },
  { field: "link", headerName: "Link", width: 280, sortable: false },
  { field: "status", headerName: "Status", width: 130, sortable: false },
  {
    field: "rating",
    headerName: "Rating",
    width: 130,
    description: "Rating given for clients in the shop",
  },
  { field: "actions", headerName: "Actions", width: 130, sortable: false },
];

const TableProducts = ({ list_products }) => {
  return (
    <div style={{ height: "95%", width: "100%" }}>
      <DataGrid
        sx={{ border: "none", padding: "0 20px 0 20px" }}
        rows={list_products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default TableProducts;
