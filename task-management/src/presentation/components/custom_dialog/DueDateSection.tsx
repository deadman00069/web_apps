import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMyAppColor } from "../../theme/colors";
import { Controller, FieldError } from "react-hook-form";
import dayjs from "dayjs";

function DueDateSection({
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

  return (
    <Box pb={"1.5rem"}>
      <Typography color={myAppColors.onSecondaryColor} pb={1} variant="body1">
        Due date
      </Typography>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null} // Convert value to Date object
              onChange={(date) => field.onChange(date?.toISOString())} // Convert selected date to ISO string
              label="Due Date"
              slotProps={{
                textField: {
                  sx: {
                    width: "100%",
                    border: error ? "1px solid red" : null,
                    borderRadius: "4px",
                  },
                },
              }}
            />
          </>
        )}
      />
      {error && (
        <Typography variant="caption" color="error" pl={2}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
}

export default DueDateSection;
