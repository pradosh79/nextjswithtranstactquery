import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { IProductListProps } from "../../../typeScripts/product.interface";
import { productListQuery, useProductDeleteMutation } from '@/customhooks/queries/product.query.hooks';
import { useRouter } from 'next/router';
import Link from "next/link";
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
  const { data, isLoading, isError, error, isPending: isDeleting } = productListQuery();
  const { mutate: deleteProduct } = useProductDeleteMutation();
  const router = useRouter();

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

  const handleEdit = (id: string) => {
    router.push(`/cms/product_details/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(Number(id)); // make sure your backend expects a number
      window.location.reload(); // optional: better to use queryClient.invalidateQueries
    }
  };

  const products = data?.product ?? []; // fallback to empty array if undefined

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Grid container spacing={3}>
        {products.map((item) => (
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

              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                }}
              >
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
