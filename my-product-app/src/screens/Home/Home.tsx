import NavBar from "../components/navbar/NavBar";
import "./Home.css";
import CustomTextField from "../components/custom_text_field/CustomTextField";
import CustomElevatedButton from "../components/custom_elevated_button/CustomElevatedButton";

import { useEffect, useState } from "react";
import { ProductDataModel } from "../../models/ProductModel";
import CustomTable from "../components/custom_table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  // List of products
  const [productList, setProductList] = useState<ProductDataModel[]>([]);

  // form data for creating product
  const [formdata, setFormData] = useState<ProductDataModel>({
    title: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  });

  // Set errors to textfield
  const [formErrors, setFormErrors] = useState<Partial<ProductDataModel>>({});

  const [isEditData, setIsEditData] = useState(false);
  // Set error to main content
  const [error, setError] = useState("");

  // Set loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // Parse the response JSON
      const result = await response.json();
      const listofProducts = result["products"];
      // Set fetched data to state
      setProductList(listofProducts);
    } catch (e) {
      console.log(`Error: ${e}`);
      setError(`${e}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (id: string) => {
    const result = window.confirm("Are you sure?");
    if (result) {
      setProductList(productList.filter((item) => item.id !== id));
    }
  };

  const addItemToTableData = () => {
    const newItem: ProductDataModel = {
      id: productList[productList.length - 1].id! + 1,
      title: formdata.title,
      description: formdata.description,
      category: formdata.category,
      price: formdata.price,
      stock: formdata.stock,
      brand: formdata.brand,
      rating: formdata.rating,
    };

    setProductList((prevTableData) => [...prevTableData, newItem]);

    clearFormData();
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      if (isEditData) {
        updateExisitingData();
      } else {
        addItemToTableData();
      }
    }
  };

  const clearFormData = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      brand: "",
      rating: "",
    });

    setFormErrors({});
  };
  const updateExisitingData = () => {
    let index = productList.findIndex((item) => item.id === formdata.id);

    if (index !== -1) {
      const updatedProductList = [...productList];
      updatedProductList[index] = formdata;

      // Update the state with the new list of products
      setProductList(updatedProductList);
    }

    setIsEditData(false);
  };
  const handleInputChange =
    (field: keyof ProductDataModel) => (value: string) => {
      setFormData({
        ...formdata,
        [field]: value,
      });
    };

  const validateForm = () => {
    let errors: Partial<ProductDataModel> = {};
    let isValid = true;

    // Validate first name
    if (!formdata.title) {
      errors.title = "Title is required";
      isValid = false;
    }

    // Validate last name
    if (!formdata.description) {
      errors.description = "Description is required";
      isValid = false;
    }

    // Validate phone no
    if (!formdata.category) {
      errors.category = "Please provide category";
      isValid = false;
    }

    // Validate gender
    if (!formdata.stock) {
      errors.stock = "Stock is required";
      isValid = false;
    }

    // Validate dob
    if (!formdata.price) {
      errors.price = "Price is required";
      isValid = false;
    }

    // Validate dob
    if (!formdata.brand) {
      errors.brand = "Price is required";
      isValid = false;
    }

    // Validate dob
    if (!formdata.rating) {
      errors.rating = "Price is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const editForm = (item: ProductDataModel) => {
    setFormData(item);
    setIsEditData(true);
  };
  return (
    <>
      <NavBar />
      <div className="home-wrapper">
        <div className="home-section-1">
          <span className="home-section-title">Table</span>
          <CustomTable
            list={productList}
            deleteButtonPressed={(id) => deleteItem(id)}
            editButtonPressed={(item) => editForm(item)}
          />
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
              value={formdata.title}
              onChange={handleInputChange("title")}
            />

            <div className="spacer"></div>
            <CustomTextField
              label="Description"
              id="description"
              isError={!!formErrors.description}
              errorText={formErrors.description}
              value={formdata.description}
              onChange={handleInputChange("description")}
            />
            <CustomTextField
              label="Category"
              id="category"
              isError={!!formErrors.category}
              errorText={formErrors.category}
              value={formdata.category}
              onChange={handleInputChange("category")}
            />
            <CustomTextField
              label="Stock"
              id="stock"
              isError={!!formErrors.stock}
              errorText={formErrors.stock}
              value={formdata.stock}
              onChange={handleInputChange("stock")}
            />
            <CustomTextField
              label="Price"
              id="price"
              isError={!!formErrors.price}
              errorText={formErrors.price}
              value={formdata.price}
              onChange={handleInputChange("price")}
            />
            <CustomTextField
              label="Brand"
              id="brand"
              isError={!!formErrors.brand}
              errorText={formErrors.brand}
              value={formdata.brand}
              onChange={handleInputChange("brand")}
            />
            <CustomTextField
              label="Rating"
              id="rating"
              isError={!!formErrors.rating}
              errorText={formErrors.rating}
              value={formdata.rating}
              onChange={handleInputChange("rating")}
            />

            <CustomElevatedButton
              name="Submit"
              onButtonClick={handleButtonClick}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
