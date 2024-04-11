import NavBar from "../components/navbar/NavBar";
import "./Home.css";
import CustomTextField from "../components/custom_text_field/CustomTextField";
import CustomElevatedButton from "../components/custom_elevated_button/CustomElevatedButton";

import { useEffect } from "react";
import CustomTable from "../components/custom_table/CustomTable";
import CustomLoading from "../components/custom_loading/CustomLoading";
import { useForm } from "./useForm";

function Home() {
  const {
    formData,
    formErrors,
    handleChange,
    validateField,
    clearFormData,
    editForm,
    handleSubmit,
    productList,
    loading,
    fetchProducts,
    deleteItem,
    onButtonClicked,
  } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="home-wrapper">
        <div className="home-section-1">
          <span className="home-section-title">Table</span>

          {loading ? (
            // If loading is true, render some loading indicator or placeholder
            <CustomLoading loading={true} />
          ) : (
            // If loading is false, render the CustomTable component with props
            <CustomTable
              list={productList}
              deleteButtonPressed={(id) => deleteItem(id)}
              editButtonPressed={(item) => editForm(item)}
            />
          )}
        </div>
        <div className="home-section-2">
          <div className="home-section-2-top-section">
            <span className="home-section-title">Form</span>
            <span className="home-section-2-button">
              <CustomElevatedButton
                name="Clear"
                onButtonClick={() => clearFormData()}
              />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <CustomTextField
              label="Title"
              id="title"
              isError={!!formErrors.title}
              errorText={formErrors.title}
              value={formData.title}
              OnBlurChange={() => validateField("title", formData.title)}
              onChange={handleChange("title")}
            />

            <div className="spacer"></div>
            <CustomTextField
              label="Description"
              id="description"
              isError={!!formErrors.description}
              errorText={formErrors.description}
              value={formData.description}
              OnBlurChange={() =>
                validateField("description", formData.description)
              }
              onChange={handleChange("description")}
            />
            <CustomTextField
              label="Category"
              id="category"
              isError={!!formErrors.category}
              errorText={formErrors.category}
              value={formData.category}
              OnBlurChange={() => validateField("category", formData.category)}
              onChange={handleChange("category")}
            />
            <CustomTextField
              label="Stock"
              id="stock"
              isError={!!formErrors.stock}
              errorText={formErrors.stock}
              value={formData.stock}
              OnBlurChange={() => validateField("stock", formData.stock)}
              onChange={handleChange("stock")}
            />
            <CustomTextField
              label="Price"
              id="price"
              isError={!!formErrors.price}
              errorText={formErrors.price}
              value={formData.price}
              OnBlurChange={() => validateField("price", formData.price)}
              onChange={handleChange("price")}
            />
            <CustomTextField
              label="Brand"
              id="brand"
              isError={!!formErrors.brand}
              errorText={formErrors.brand}
              value={formData.brand}
              OnBlurChange={() => validateField("brand", formData.brand)}
              onChange={handleChange("brand")}
            />
            <CustomTextField
              label="Rating"
              id="rating"
              isError={!!formErrors.rating}
              errorText={formErrors.rating}
              value={formData.rating}
              OnBlurChange={() => validateField("rating", formData.rating)}
              onChange={handleChange("rating")}
            />

            <CustomTextField
              label="email"
              id="email"
              isError={!!formErrors.email}
              errorText={formErrors.email}
              value={formData.email!}
              OnBlurChange={() => validateField("email", formData.email ?? "")}
              onChange={handleChange("email")}
            />

            <CustomTextField
              label="Phone no"
              id="ohone-no"
              isError={!!formErrors.phoneNo}
              errorText={formErrors.phoneNo}
              value={formData.phoneNo!}
              OnBlurChange={() =>
                validateField("phoneNo", formData.phoneNo ?? "")
              }
              onChange={handleChange("phoneNo")}
            />

            <CustomElevatedButton
              name="Submit"
              onButtonClick={onButtonClicked}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
