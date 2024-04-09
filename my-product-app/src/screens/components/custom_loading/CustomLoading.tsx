import ClipLoader from "react-spinners/ClipLoader";
import "./CustomLoading.css";
function CustomLoading({ loading }: { loading: boolean }) {
  return (
    <div className="loading-wrapper">
      <ClipLoader
        color="#0062ff"
        loading={loading}
        // cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default CustomLoading;
