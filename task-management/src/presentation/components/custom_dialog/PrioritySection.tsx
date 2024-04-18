import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useMyAppColor } from "../../theme/colors";
import { Controller, FieldError } from "react-hook-form";

function PrioritySection({
  name,
  control,
  rules,
  error,
}: {
  name: string;
  control: any;
  error?: FieldError | undefined;
  rules?: Object;
}) {
  const myAppColors = useMyAppColor();
  const options = [
    { value: "2", label: "High" },
    { value: "1", label: "Medium" },
    { value: "0", label: "Low" },
  ];

  return (
    <Box mb={"1.5rem"}>
      <Typography color={myAppColors.onSecondaryColor} pb={1} variant="body1">
        Priority
      </Typography>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select
              {...field}
              fullWidth
              error={!!error?.message}
              SelectDisplayProps={{
                style: { paddingTop: 8, paddingBottom: 8 },
              }}
            >
              <MenuItem value="" disabled>
                Select Priority
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography variant="caption" color="error" pl={2}>
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
}

export default PrioritySection;
