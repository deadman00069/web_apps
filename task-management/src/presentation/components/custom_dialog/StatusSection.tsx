import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useMyAppColor } from "../../theme/colors";
import { Controller, FieldError } from "react-hook-form";

function StatusSection({
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
    <>
      <Typography color={myAppColors.onSecondaryColor} pb={1} variant="body1">
        Status
      </Typography>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            {...field}
            color="red"
          >
            <FormControlLabel
              value="Open"
              control={<Radio required />}
              label="Open"
            />
            <FormControlLabel
              value="In-progress"
              control={<Radio required />}
              label="In-progress"
            />
            <FormControlLabel
              value="Completed"
              control={<Radio required />}
              label="Completed"
            />
          </RadioGroup>
        )}
      />
      {error && (
        <Typography variant="caption" color="error" pl={2}>
          {error.message}
        </Typography>
      )}
      {/* <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Open"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Open" control={<Radio />} label="Open" />
        <FormControlLabel
          value="In-progress"
          control={<Radio />}
          label="In-progress"
        />
        <FormControlLabel
          value="Completed"
          control={<Radio />}
          label="Completed"
        />
      </RadioGroup> */}
    </>
  );
}

export default StatusSection;
