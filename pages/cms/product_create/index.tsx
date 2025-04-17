import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  productListQuery,
  useProductDeleteMutation,
} from "@/customhooks/queries/product.query.hooks";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

// Define product type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number | string;
}

export default function ProductList(): JSX.Element {
  const router = useRouter();
  const { data, isLoading, isError, error } = productListQuery();
  const { mutate: deleteProduct } = useProductDeleteMutation();
  const [loadingProducts, setLoadingProducts] = useState<Record<string, boolean>>({});

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setLoadingProducts((prev) => ({ ...prev, [id]: true }));

    deleteProduct(Number(id), {
      onSettled: () => {
        setLoadingProducts((prev) => ({ ...prev, [id]: false }));
        window.location.reload(); // optional: use queryClient.invalidateQueries
      },
    });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (params: GridRenderCellParams<any, number | string>) =>
        `₹${params.value ?? 0}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<Product>) => (
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/cms/product_details/${params.row._id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
            disabled={loadingProducts[params.row._id]}
          >
            {loadingProducts[params.row._id] ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">
          Error: {error instanceof Error ? error.message : "Something went wrong"}
        </Typography>
      </Box>
    );
  }

  const products: Product[] = (data?.product || []).map((p: Product) => ({
    ...p,
    price: Number(p.price) || 0,
  }));

  return (
    <Paper sx={{ p: 3, width: "100%", height: 500 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ border: 0 }}
        getRowId={(row) => row._id}
      />
    </Paper>
  );
}
