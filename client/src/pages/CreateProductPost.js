import { Container } from "@mui/system";
import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputAdornment, InputLabel, OutlinedInput, Grid, TextField, Button, Link, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import Category from "../_mock/category";

import Page from '../components/Page';

// ----------------------------------------------------------------------

const initialFormValues = {
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
    ProductColor: "",
    category: "",
    subCategory: "",
}

export const useFormControls = () => {

    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        const temp = { ...errors }

        if ("ProductName" in fieldValues)
            temp.ProductName = fieldValues.ProductName ? "" : "This field is required."

        if ("ProductDescription" in fieldValues)
            temp.ProductDescription = fieldValues.ProductDescription ? "" : "This field is required."

        if ("ProductColor" in fieldValues)
            temp.ProductColor = fieldValues.ProductColor ? "" : "This field is required."


        if ("category" in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required."

        if ("subCategory" in fieldValues)
            temp.subCategory = fieldValues.subCategory ? "" : "This field is required."

        setErrors({
            ...temp
        });
    }

    const handleChange = (event) => {
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleCheckBox = (event) => {
        const checkBoxData = event.target;
        setValues({
            ...values,
            [checkBoxData.name]: checkBoxData.checked
        })
    }


    const formIsValid = (fieldValues = values) => {
        const isValid =
            fieldValues.firstName &&
            fieldValues.lastName &&
            fieldValues.email &&
            fieldValues.userType &&
            fieldValues.password &&
            Object.values(errors).every((x) => x === "");

        return isValid;
    };


    return {
        handleChange,
        formIsValid,
        errors,
        values
    };
}
export default function CreateProductPost() {
    const {
        handleChange,
        formIsValid,
        errors,
        values
    } = useFormControls();


    const navigate = useNavigate();

    const navigateTo = (location) => {
        navigate(location);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Page>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Create your Product Post!
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="given-name"
                                name="ProductName"
                                required
                                fullWidth
                                id="ProductName"
                                label="Product Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.category}
                                    label="subCategory"
                                    onChange={handleChange}
                                >
                                    {Category.map((option, index) =>
                                        <Box key={index}>
                                            <MenuItem value={option[0]}>{option[0]}</MenuItem>
                                        </Box>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.subCategory}
                                    label="subCategory"
                                    onChange={handleChange}
                                >
                                    {Category.map((option, index) =>
                                        <Box key={option.id}>
                                            <MenuItem value={option[1]}>{option[1]}</MenuItem>
                                        </Box>
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Multiline"
                                multiline
                                rows={4} sx={{ width: '100%' }}
                                defaultValue="Description"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl sx={{ width: '100%' }} variant="outlined">

                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={values.amount}
                                    onChange={handleChange('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Post
                    </Button>
                </Box>
            </Container>
        </Page>
    )
}