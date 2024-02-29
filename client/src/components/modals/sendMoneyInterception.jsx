"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { sendMoney } from "@/app/api/route";


const SendMoneyForm = ({ isDialogOpened, handleCloseDialog,onFormSubmit }) => {
  const [id, setId] = useState(undefined);

  const router = useRouter();
  const cookies = useCookies();
  useEffect(() => {
    const cookieInfo = cookies.get("info");
    if (cookieInfo) {
      setId(cookieInfo);
    }
  }, [cookies]);
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const amountSent = formJson.amountSent;
    const senderUserId = formJson.senderUserId;
    const receiverUserId = formJson.receiverUserId;
    console.log("Amount Sent:", amountSent);
    console.log("Sender User ID:", senderUserId);
    console.log("Receiver User ID:", receiverUserId);
    console.log(formJson);
    try {
      const result = await sendMoney(formJson);
      handleClose();
      onFormSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpened}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Enviar Dinero</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="amountSent"
            name="amountSent"
            label="Cantidad a Enviar"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="receiverUserId"
            name="receiverUserId"
            label="Número de Cuenta a Enviar"
            fullWidth
            variant="standard"
          />
          <input
            type="hidden"
            id="senderUserId"
            name="senderUserId"
            value={id}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button type="submit" color="success">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendMoneyForm;
