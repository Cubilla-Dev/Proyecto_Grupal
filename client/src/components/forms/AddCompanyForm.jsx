'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCompanyForm = () => {
    const [companyName, setCompanyName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleCloseError = () => {
        setError(false);
    };

    const handleCreateCompany = async (e) => {
        e.preventDefault();

        try {
            const data = {
                name: companyName,
                accountNumber,
                monthlyFee,
                imageUrl,
            };
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/company`, data, { withCredentials: true });

            const result = await response.data;
            console.log(result);

            setCompanyName("");
            setAccountNumber("");
            setMonthlyFee("");
            setImageUrl("");
            router.push("/miTienda");
        } catch (error) {
            console.error("Error creating company:", error);

            if (error.response && error.response.status === 400) {
                setError(true);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    border: "2px solid black",
                    padding: 4,
                    backgroundColor: "orange",
                }}
            >
                <form onSubmit={handleCreateCompany}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-around" marginTop={10}>
                        <Grid item>
                            <Typography variant="h3" gutterBottom align="center" color="primary">
                                Registrar Empresa
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link href={"/pageAdmin"}>Ir a página de administración</Link>
                        </Grid>
                    </Grid>
                    <TextField
                        sx={{ backgroundColor: "white", marginTop: 2 }}
                        type="text"
                        label="Nombre de la Empresa"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                    <TextField
                        sx={{ backgroundColor: "white", marginTop: 2 }}
                        type="number"
                        label="Número de Cuenta"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    <TextField
                        sx={{ backgroundColor: "white", marginTop: 2 }}
                        type="number"
                        label="Tarifa Mensual"
                        value={monthlyFee}
                        onChange={(e) => setMonthlyFee(e.target.value)}
                        required
                    />
                    <TextField
                        sx={{ backgroundColor: "white", marginTop: 2 }}
                        type="text"
                        label="URL de la Imagen"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Guardar Empresa
                    </Button>
                </form>

                <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="error">
                        Error al registrar la empresa. Por favor, inténtalo de nuevo.
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default AddCompanyForm;
