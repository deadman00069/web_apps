import { Box, SxProps, Theme, Typography } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import "./MyAppTextField.css";
import { useMyAppColor } from "../../theme/colors";
import { Controller, FieldError } from "react-hook-form";

interface CustomInputProps<T> {
  name: string;
  control: any;
  error?: FieldError | undefined;
  rules?: Object;
  label: string;
  isMultiLine?: boolean;
  inputProps?: object;
  sx?: SxProps<Theme>;
}

const MyAppTextField = <T extends object>({
  label,
  name,
  control,
  rules,
  error,
  isMultiLine = false,
  inputProps,
  sx,
}: CustomInputProps<T>) => {
  const myAppColors = useMyAppColor();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <Box sx={sx}>
            <Box display={"flex"}>
              <Typography color={myAppColors.onSecondaryColor} variant="body1">
                {label}
              </Typography>
              <Typography color="red" variant="body1">
                *
              </Typography>
            </Box>

            <TextField
              {...field}
              variant="outlined"
              fullWidth
              multiline={isMultiLine}
              rows={isMultiLine ? 4 : 1}
              inputProps={inputProps}
              sx={{
                pt: 1,
              }}
              error={!!error?.message}
              helperText={error?.message}
            />
          </Box>
        </>
      )}
    />
  );
};

export default MyAppTextField;
