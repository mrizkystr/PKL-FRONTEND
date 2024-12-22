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
import { dataPsApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar component

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

const CreateForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues: steps.reduce((acc, step) => {
      (step.fields || []).forEach((field) => {
        acc[field] = null;
      });
      return acc;
    }, {}),
  });

  const mutation = useMutation({
    mutationFn: (data) => dataPsApi.create(data),
    onSuccess: () => {
      toast.success("Data created successfully");
      navigate("/data-ps");
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

  const currentFields = steps[activeStep]?.fields || [];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#001F3F", minHeight: "100vh", p: 3 }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, marginTop: 18  }}>
        <Paper
          sx={{
            p: 3,
            backgroundColor: "#0D47A1",
            color: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: "#FFFFFF" }}>
            Create New Data
          </Typography>

          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#4FC3F7 !important",
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#4FC3F7",
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                backgroundColor: "#E3F2FD",
                p: 3,
                borderRadius: "8px",
                mb: 3,
              }}
            >
              {currentFields.map((field) => (
                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  margin="normal"
                  {...register(field)}
                  defaultValue=""
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </Box>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => navigate("/data-ps")}
                variant="outlined"
                sx={{
                  backgroundColor: "#4FC3F7",
                  color: "#FFFFFF",
                  "&:hover": { backgroundColor: "#0288D1" },
                }}
              >
                Back to List
              </Button>
              <Box>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{
                    mr: 2,
                    backgroundColor: "#4FC3F7",
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#0288D1" },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: "#4FC3F7",
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#0288D1" },
                  }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateForm;
