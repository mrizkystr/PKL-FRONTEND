import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { salesApi } from "../../api/api";
import SidebarSales from "../../components/layout/SidebarSales"; // Import SidebarSales

const steps = [
  {
    label: "Basic Info",
    fields: ["ORDER_ID", "REGIONAL", "WITEL", "DATEL", "STO"],
  },
  {
    label: "Service Info",
    fields: [
      "JENISPSB",
      "TYPE_TRANS",
      "STATUS_RESUME",
      "TYPE_LAYANAN",
      "STATUS_INET",
      "STATUS_ONU",
    ],
  },
  {
    label: "Customer Info",
    fields: [
      "CUSTOMER_NAME",
      "CONTACT_HP",
      "INS_ADDRESS",
      "GPS_LONGITUDE",
      "GPS_LATITUDE",
      "NCLI",
      "POTS",
      "SPEEDY",
      "LOC_ID",
    ],
  },
  {
    label: "Order Details",
    fields: [
      "ORDER_DATE",
      "LAST_UPDATED_DATE",
      "WONUM",
      "STATUS_VOICE",
      "UPLOAD",
      "DOWNLOAD",
      "LAST_PROGRAM",
      "LAST_START",
      "TINDAK_LANJUT",
      "ISI_COMMENT",
      "TGL_COMMENT",
    ],
  },
  {
    label: "Manajemen Info",
    fields: [
      "TANGGAL_MANJA",
      "TGL_MANJA",
      "DETAIL_MANJA",
      "KELOMPOK_KENDALA",
      "KELOMPOK_STATUS",
      "HERO",
      "ADDON",
    ],
  },
  {
    label: "Sales Info",
    fields: [
      "Kode_sales",
      "Nama_SA",
      "Mitra",
      "Ekosistem",
      "PACKAGE_NAME",
      "GROUP_PAKET",
    ],
  },
  {
    label: "Cancellation Info",
    fields: ["REASON_CANCEL", "KETERANGAN_CANCEL"],
  },
];

const SalesCreateForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: steps.reduce((acc, step) => {
      step.fields.forEach((field) => {
        acc[field] = null;
      });
      return acc;
    }, {}),
  });

  const mutation = useMutation({
    mutationFn: (data) => salesApi.dataPsApi.create(data),
    onSuccess: () => {
      toast.success("Data created successfully");
      navigate("/sales");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value || null])
    );
    mutation.mutate(sanitizedData);
  };

  const currentFields = steps[activeStep].fields;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarSales />

      {/* Form Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Create New Data
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentFields.map((field) => (
              <TextField
                key={field}
                label={field}
                fullWidth
                margin="normal"
                {...register(field)}
                defaultValue=""
              />
            ))}

            <Box sx={{ mt: 2 }}>
              <Button onClick={handleBack} disabled={activeStep === 0}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default SalesCreateForm;
