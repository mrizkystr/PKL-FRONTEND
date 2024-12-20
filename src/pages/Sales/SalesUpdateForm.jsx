import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { salesApi } from "../../api/api";
import SidebarSales from "../../components/layout/SidebarSales"; // Import SidebarSales

const steps = [
  {
    label: "Basic Info",
    fields: ["ORDER_ID", "REGIONAL", "WITEL", "DATEL", "STO"],
  },
  // ... other steps remain the same
];

const SalesUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);

  const { register, handleSubmit, reset } = useForm();

  const { data } = useQuery({
    queryKey: ["sales", id],
    queryFn: () => salesApi.dataPsApi.getDetail(id),
    onSuccess: (data) => reset(data.data),
  });

  const mutation = useMutation({
    mutationFn: (data) => salesApi.dataPsApi.update(id, data),
    onSuccess: () => {
      toast.success("Data updated successfully");
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
            Update Data ID: {id}
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

export default SalesUpdateForm;
