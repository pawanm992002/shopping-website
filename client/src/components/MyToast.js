import { Snackbar, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function MyToast({ toast, showToast, status, msg }) {
  return (
    <Snackbar
      open={toast}
      autoHideDuration={2000}
      onClose={() => showToast(false)}
      message={msg}
      action={<Close onClick={() => showToast(false)}>jkj</Close>}
      color="info"
    >
      <Alert
        onClose={() => showToast(false)}
        severity={`${status ? "success" : "warning"}`}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
