import { Box, Button, Typography, TextField, InputAdornment, IconButton, CircularProgress, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup";
import TextFieldComponent from '../../utils/TextFieldComponent';
import { Link, useNavigate } from 'react-router-dom';
import { inputLabels } from '../../GlobalTitles';
import { useDispatch } from 'react-redux';
import { emailValidation, signIn } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputnames = inputLabels();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState(false);
    const initialValues = {
        email_id: "",
        otp: "",
    };
    const checkoutSchema = yup.object().shape({
        email_id: yup.string().email("Invalid email").required("Required*"),
        otp: yup.string().required("Required*"),
    });

    const validateEmailWithApi = async (email_id) => {
        try {
            const sendingData = { email_id }
            setIsValidating(true);
            const response = await dispatch(emailValidation(sendingData))
            // console.log("response.payload", response)
            if (response?.payload) {
                await Swal.fire({
                    icon: "success",
                    title: `OTP Verification`,
                    text: `${response?.payload?.message}`,
                })
                setIsEmailValid(true);
                setError(false);
            } else {
                setIsEmailValid(false);
                setError('Email is not registered. Please sign up first.');
            };
        } catch (error) {
            setIsEmailValid(false);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsValidating(false);
        }
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        // console.log("values", values)
        const response = await dispatch(signIn(values))
        // console.log("Login", response)
        if (response && response?.payload) {
            await localStorage.setItem("Taxsure", response?.payload)
            // await Swal.fire({
            //     icon: "success",
            //     title: "Signin successfully done.",
            //     text: "Welcome to Dana",
            // })
            await navigate('/dashboard')
            setError(false)
        } else {
            setError(true)
        };
    }

    return (
        <>
            <Grid container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{
                    width: "40%",
                    backgroundColor: "#ffffff",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                }}>
                    <Typography variant="h5" align="center" fontWeight="500" mb={1}>
                        Welcome Back!
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" mb={3}>
                        Log in to continue your tax journey
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
                                <Box mb={2}>
                                    <Typography variant="body2" mb={1}>{inputnames.email}</Typography>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        name="email_id"
                                        placeholder="Enter your Email"
                                        autoComplete='on'
                                        id="email_id"
                                        value={values.email_id}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.email_id && !!errors.email_id}
                                        helperText={touched.email_id && errors.email_id}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => {
                                                            if (values.email_id) {
                                                                validateEmailWithApi(values.email_id);
                                                            }
                                                        }}
                                                        disabled={isValidating || !values.email_id}
                                                    >
                                                        {isValidating ? (
                                                            <CircularProgress size={20} />
                                                        ) : (
                                                            <CheckCircle
                                                                sx={{
                                                                    color: isEmailValid ? '#4CAF50' : '#bdbdbd',
                                                                    transition: 'color 0.3s ease'
                                                                }}
                                                            />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                {isEmailValid && (
                                    <Box mb={2}>
                                        <Typography variant="body2" mb={1}>{inputnames.otp}</Typography>
                                        <TextFieldComponent
                                            name="otp"
                                            placeholder="Enter your OTP"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values.otp}
                                            errors={errors.otp}
                                            touched={touched.otp}
                                            variant={1}
                                        />
                                    </Box>
                                )}

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
                                    disabled={!isEmailValid}
                                >
                                    Log In
                                </Button>

                                <Typography variant="body2" align="center">
                                    Don't have an account? <Link to="/sign-up" style={{ color: '#3366FF', textDecoration: 'none' }}>Register now</Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </>
    )
}

export default Login