import { Link, Typography } from "@mui/material";

function AlreadyHaveAccountSection({
  isSignup = false,
}: {
  isSignup?: boolean;
}) {
  return (
    <Typography
      fontWeight={"400"}
      sx={{
        paddingTop: "2px",
      }}
      variant="body1"
    >
      {isSignup! ? "Don’t have an account?" : "Already have an account?"}
      <Link href={isSignup! ? "/" : "/login"}>
        {isSignup! ? "Sign up" : "Log in"}
      </Link>
    </Typography>
  );
}

export default AlreadyHaveAccountSection;
