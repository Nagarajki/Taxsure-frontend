import { Box, Button, Typography, TextField, InputAdornment, IconButton, CircularProgress, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import TextFieldComponent from '../../utils/TextFieldComponent';
import { Link, useNavigate } from 'react-router-dom';
import { inputLabels } from '../../GlobalTitles';
import { signUp } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputnames = inputLabels();
    const [error, setError] = useState(false);
    const initialValues = {
        first_name: "",
        last_name: "",
        email_id: "",
        otp: "",
    };
    const checkoutSchema = yup.object().shape({
        first_name: yup.string().required("Required*"),
        last_name: yup.string().required("Required*"),
        email_id: yup.string().email("Invalid email").required("Required*")
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log("values", values)
        const response = await dispatch(signUp(values))
        if (response && response?.payload) {
            await Swal.fire({
                icon: "success",
                title: "Registration",
                text: `${response?.payload?.message}`,
            })
            await navigate('/sign-in')
            setError(false)
        } else {
            setError(true)
        };
    }

    return (
        <>
            <Grid container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{
                    width: { xs: "60%", sm: "60%", md: "50%", xl: "40%" },
                    backgroundColor: "#ffffff",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                }}>
                    <Typography variant="h5" align="center" fontWeight="500" mb={1}>
                        Create Your TaxSure Account
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" mb={3}>
                        Start filing your taxes with confidence
                    </Typography>

                    <Formik onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                        enableReinitialize
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                                    <Box mb={2}>
                                        <Typography variant="body2" mb={1}>{inputnames.firstName}</Typography>
                                        <TextFieldComponent
                                            name="first_name"
                                            placeholder="Enter your First Name"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values.first_name}
                                            errors={errors.first_name}
                                            touched={touched.first_name}
                                            variant={1}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" mb={1}>{inputnames.lastName}</Typography>
                                        <TextFieldComponent
                                            name="last_name"
                                            placeholder="Enter your Last Name"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values.last_name}
                                            errors={errors.last_name}
                                            touched={touched.last_name}
                                            variant={1}
                                        />
                                    </Box>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body2" mb={1}>{inputnames.email}</Typography>
                                    <TextFieldComponent
                                        name="email_id"
                                        placeholder="Enter your Email Address"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values.email_id}
                                        errors={errors.email_id}
                                        touched={touched.email_id}
                                        variant={1}
                                    />
                                </Box>

                                {error && (
                                    <Typography
                                        variant='body2'
                                        color='error'
                                        align="center"
                                        sx={{ mb: 2 }}
                                    >
                                        {error}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 1,
                                        mb: 2,
                                        backgroundColor: "#3366FF",
                                        "&:hover": { backgroundColor: "#2563EB" }
                                    }}
                                >
                                    Sign Up
                                </Button>

                                <Typography variant="body2" align="center">
                                    Already have an account? <Link to="/sign-in" style={{ color: '#3366FF', textDecoration: 'none' }}>Sign In</Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </>
    )
}

export default Registration