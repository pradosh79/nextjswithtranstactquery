import React from 'react';
import { useRouter } from 'next/router';
import { productListQuery, useProductDeleteMutation } from '@/customhooks/queries/product.query.hooks';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function ProductList() {
  const router = useRouter();
  const { data, isLoading, isError, error, isPending: isDeleting } = productListQuery();
  const { mutate: deleteProduct } = useProductDeleteMutation();

  const handleEdit = (id: string) => {
    router.push(`/cms/product_details/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(Number(id));
      window.location.reload(); // or use queryClient.invalidateQueries
    }
  };

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

  // ✅ Safe fallback to an empty array
  const products = data?.product ?? [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Grid container spacing={3}>
        {products.map((item:any) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ position: 'relative', minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{item.name}</Typography>
                <Typography>Category: {item.category}</Typography>
                <Typography>Price: ₹{item.price}</Typography>
                {item.description && (
                  <Typography>Description: {item.description}</Typography>
                )}
              </CardContent>

              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(item._id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(item._id)}
                    disabled={isDeleting}
                    sx={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
