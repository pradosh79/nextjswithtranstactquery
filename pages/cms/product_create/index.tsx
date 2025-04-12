import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endpoint";
import { IproductListProps } from "@/typeScripts/product.interface";
import { productCreateMutation } from '../../../customhooks/queries/product.query.hooks';
import { Paper, Typography, TextField, Button, Box, Grid} from '@mui/material';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function productCreate() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { mutate, isPending } = productCreateMutation();
  const router = useRouter();
  const onSubmit = async (createData: FieldValues) => {
     //console.log(createData);
    const { name, price, description, category } = createData as { name: string, price: string, description: string, category: string };
    const formdata = new URLSearchParams();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("category", category);
    mutate(formdata, {
      onSuccess: () => {
         router.push("/cms/product_list");
      },
    });
    console.log(formdata);
  };
  return (
    <div>
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
          Create Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", { required: "Name is required" })}
            label="Product Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.name}
          />

          <TextField
            {...register("price", { required: "Price is required" })}
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.price}
          />

          <TextField
            {...register("description", { required: "Description is required" })}
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
          />

          <TextField
            {...register("category", { required: "Category is required" })}
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.category}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, py: 1.5 }}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Paper>
    </Grid>
  </Grid>
</div>
  )
}
