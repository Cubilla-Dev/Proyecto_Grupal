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
import { sendMoney, updateUserWallet } from "@/app/api/route";

const ChargeWalletForm = ({ isDialogOpened, handleCloseDialog,onFormSubmit }) => {
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
    formJson.wallet = Number(formJson.wallet);
    //console.log(formJson);
    try {
      const result = await updateUserWallet(formJson);
      handleClose();
      onFormSubmit();
      console.log("enviado");
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
        <DialogTitle>Recargar Wallet</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="wallet"
            name="wallet"
            label="Cantidad a recargar"
            fullWidth
            variant="standard"
            inputProps={{
                min: "0",
                pattern: "\\d*",
                onKeyDown: (e) => {
                  if (
                    !/^[0-9]*$/.test(e.key) && 
                    e.key !== "Backspace" && 
                    e.key !== "Delete" && 
                    e.key !== "ArrowLeft" && 
                    e.key !== "ArrowRight" 
                  ) {
                    e.preventDefault();
                  }
                },
              }}
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

export default ChargeWalletForm;
