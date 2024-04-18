import { Button, Typography } from "@mui/material";

function MyAppElevatedButton({
  label,
  py = "15px",
  px = "31px",
  borderRadius = 50,
  onClick,
}: {
  label: string;
  px?: string;
  py?: string;
  borderRadius?: number;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="contained"
      type="submit"
      style={{
        borderRadius: borderRadius,
      }}
      sx={{
        mb: 1,
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          py: py,
          px: px,
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}

export default MyAppElevatedButton;
