import { useState } from "react";
import { ProductDataModel } from "../../models/ProductModel";
import { useUtils } from "../../utils/Utils";
import { AppValidation } from "../../utils/Validations";
export const useForm = () => {
  const { generateUniqueId } = useUtils();

  const [formData, setFormData] = useState<ProductDataModel>({
    title: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    email: "",
    phoneNo: "",
  });
  const [loading, setLoading] = useState(true);

  const [productList, setProductList] = useState<ProductDataModel[]>([]);

  const [formErrors, setFormErrors] = useState<Partial<ProductDataModel>>({});

  const [isEditData, setIsEditData] = useState(false);

  const {
    customValidateField,
    validateIsInteger,
    validateIsDouble,
    customValidateEmail,
    validatePhoneNo,
  } = AppValidation();

  /// For handling input on-change
  const handleChange =
    (field: keyof ProductDataModel) =>
    (value: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: value.target.value,
      });
    };

  /// For validating field
  const validateField = (
    name: keyof ProductDataModel,
    value: string
  ): boolean => {
    // ... your validation logic
    switch (name) {
      case "title":
        {
          const { isValid, errorMessage } = customValidateField(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "description":
        {
          const { isValid, errorMessage } = customValidateField(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;

      case "category":
        {
          const { isValid, errorMessage } = customValidateField(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "rating":
        {
          const { isValid, errorMessage } = validateIsDouble(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "price":
        {
          const { isValid, errorMessage } = validateIsDouble(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;

      case "stock":
        {
          const { isValid, errorMessage } = validateIsInteger(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "brand":
        {
          const { isValid, errorMessage } = customValidateField(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "email":
        {
          const { isValid, errorMessage } = customValidateEmail(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;
      case "phoneNo":
        {
          const { isValid, errorMessage } = validatePhoneNo(value);

          if (!isValid) {
            setFormErrors((prevState) => ({
              ...prevState,
              [name]: errorMessage,
            }));
            return false; // Early return if validation fails
          }
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
          return true;
        }
        break;

      default:
        return true;
        break;
    }
  };

  /// For validating all fields
  const validateAll = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    for (const key in formData) {
      if (!validateField(key as keyof ProductDataModel, formData[key])) {
        errors.push(formData[key]); // Or a more specific error message based on validation logic
      }
    }
    return { isValid: errors.length === 0, errors };
  };

  /// When button is clicked
  const onButtonClicked = () => {
    const validationResult = validateAll();
    if (!validationResult.isValid) {
      // Handle overall validation failure (e.g., display error messages)
      console.error("Validation failed:", validationResult.errors);
    } else {
      // Form submission logic (if valid)
      console.log("Form is valid:", formData);
      if (isEditData) {
        updateExisitingData();
      } else {
        addItemToTableData();
      }
    }
  };

  /// To clear form
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
      email: "",
      phoneNo: "",
    });

    setFormErrors({});
  };

  /// When click on edit icon
  const editForm = (item: ProductDataModel) => {
    setFormErrors({});
    setFormData({
      id: item.id || "",
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      price: item.price || "",
      stock: item.stock || "",
      brand: item.brand || "",
      rating: item.rating || "",
      email: item.email || "", // Ensure that email is set to an empty string if undefined
      phoneNo: item.phoneNo || "", //
    });
    setIsEditData(true);
  };

  const updateExisitingData = () => {
    let index = productList.findIndex((item) => item.id === formData.id);
    console.log(`index is ${index}`);
    if (index !== -1) {
      const updatedProductList = [...productList];
      updatedProductList[index] = formData;
      // Update the state with the new list of products
      setProductList(updatedProductList);
      clearFormData();
    }
    setIsEditData(false);
  };

  const addItemToTableData = () => {
    const newItem: ProductDataModel = {
      id: generateUniqueId(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      brand: formData.brand,
      rating: formData.rating,
    };

    setProductList((prevTableData) => [...prevTableData, newItem]);

    clearFormData();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      // setError(`${e}`);
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

  return {
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
  };
};
