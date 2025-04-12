'use client';

import { useForm } from 'react-hook-form';
import { productDetailsQuery } from '@/customhooks/queries/product.query.hooks';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useProductUpdate } from '../../../customhooks/queries/product.query.hooks';
import { useRouter } from 'next/navigation';

export default function ProductDetails() {
    const params = useParams();
    const { mutateAsync, isPending } = useProductUpdate();
    const productId = params?.id as string | undefined;
    const router = useRouter();
    const {
        data: product,
        isLoading,
        error,
        refetch,
      } = productDetailsQuery(productId || '');
       console.log(product?.product.name);
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm();
    
      useEffect(() => {
        if (product?.product) {
          reset({
            name: product?.product.name??'',
            description: product?.product.description ?? '',
            category: product?.product.category ?? '',
            price: product?.product.price?.toString() ?? '',
          });
        }
      }, [product, reset]);
    
      const onSubmit = async (data: ProductFormValues) => {
        try {
          const payload = {
            ...data,
            price: parseFloat(data.price),
          };
      
          await mutateAsync({ id: productId!, data: payload }); // ✅ use mutateAsync
          alert("Product updated successfully!");
          router.push("/cms/product_list");
        } catch (err) {
          console.error("Update failed", err);
          alert("Failed to update product.");
        }
      };
    
      if (!productId) return '<div>Loading product ID...</div>';
      if (isLoading) return '<div>Loading...</div>';
      if (error) return '<div>Error loading product details.</div>';

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', px: 2 }}
    >
      <Grid item xs={12} sm={10} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mx: 'auto',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            Edit Product
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('name', { required: 'Name is required' })}
              label="Product Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              {...register('price', {
                required: 'Price is required',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Enter a valid price',
                },
              })}
              label="Price"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              {...register('description', { required: 'Description is required' })}
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              {...register('category', { required: 'Category is required' })}
              label="Category"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.category}
              helperText={errors.category?.message}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, py: 1.5 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
