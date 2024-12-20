import React from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ImportDialog = ({ open, onClose, onImport }) => {
  const [file, setFile] = React.useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Import Excel File</DialogTitle>
      <DialogContent>
        <TextField
          type="file"
          inputProps={{ accept: ".xls,.xlsx" }}
          onChange={handleFileChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleImport} color="primary">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDialog;
