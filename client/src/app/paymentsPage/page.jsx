"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppBarComponent from "@/components/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'next-client-cookies';
import { getUserHistoryTranf } from "../api/route";
import AppContext from '@/app/AppContext';

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 260 : `-${0}px`,
  })
);


const PaymentsPage = ({ handleDrawerClose }) => {
  const [open, setOpen] = useState(false);
  const [historyTranf, setHistoryTranf]=useState([])
  const cookies = useCookies();
  const context=useContext(AppContext)
  console.log( context.stateContext);

  useEffect(() => {
    const cookieInfo = cookies.get("info");
    const fetchData = async () => {
        try {
            if (cookieInfo) {
                const resultHistory = await getUserHistoryTranf(cookieInfo);
               // console.log(resultHistory);
                setHistoryTranf(resultHistory.data.map((item, index) => ({
                    id: index + 1,
                    name: item.nbr_completo_destina,
                    amount: parseInt(item.monto, 10),
                    createdAt: new Date(item.createdAt).toLocaleString(),
                    numero_cuenta: item.cuenta_destinatario,
                })));
                context.setStateContext(false)
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [ context.stateContext]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    handleDrawerClose;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'numero_cuenta',
      headerName: 'Numero de Cuenta',
      width: 300,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      width: 300,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Monto',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Creación',
      width: 160,
      editable: false,
    },
];
  


  return (
    <Box>
      <CssBaseline />
      <AppBarComponent
        open={open}
        handleDrawerClose={handleCloseDrawer}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Main
        open={open}
        sx={{
          mt: "79px",
          height: "848px",
          backgroundColor: "#f3f5f9",
          borderRadius: "50px",
        }}
      >
        <Stack component={Paper} borderRadius="30px" alignItems="center">
          <h1>Ultimos Movimientos</h1>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={historyTranf}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Stack>
      </Main>
    </Box>
  );
};

export default PaymentsPage;
