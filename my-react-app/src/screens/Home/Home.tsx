import NavBar from "../components/navbar/NavBar";
import "./Home.css";
import CustomTextField from "../components/custom_text_field/CustomTextField";
import CustomElevatedButton from "../components/custom_elevated_button/CustomElevatedButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";

interface FormData {
  uid: string;
  fname: string;
  lname: string;
  email: string;
  phoneNo: string;
  gender: string;
  date: string;
}

function Home() {
  
  const [formData, setFormData] = useState<FormData>({
    uid: "",
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    gender: "",
    date: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const [tableData, setTableData] = useState<FormData[]>([]);

  let items = tableData.map((item) => (
    <tr key={item.uid}>
      <td>{item.uid}</td>
      <td>{item.fname}</td>
      <td>{item.lname}</td>
      <td>{item.email}</td>
      <td>{item.phoneNo}</td>
      <td>{item.gender}</td>
      <td>{item.date}</td>
      <td>
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteItem(item.uid)}
        />
      </td>
    </tr>
  ));

  const deleteItem = (uid: string) => {
    const result = window.confirm("Are you sure?");
    if (result) {
      setTableData(tableData.filter((item) => item.uid !== uid));
      console.log("User confirmed the action");
    } else {
      console.log("User canceled the action");
    }
  };

  const addItemToTableData = () => {
    const newItem: FormData = {
      uid: generateUniqueId(), 
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      phoneNo: formData.phoneNo,
      gender: formData.gender,
      date: formData.date,
    };

    setTableData((prevTableData) => [...prevTableData, newItem]);

    setFormData({
      uid: "",
      fname: "",
      lname: "",
      email: "",
      phoneNo: "",
      gender: "",
      date: "",
    });
  };

  const generateUniqueId = (): string => {
    // Generate a random number and convert it to a string
    const randomNumber = Math.random() * 1000000;
    const randomString = randomNumber.toString();

    // Get the current timestamp and convert it to a string
    const timestamp = Date.now().toString();

    // Concatenate the random string and timestamp to create a unique ID
    const uniqueId = randomString + timestamp;

    return uniqueId;
  };

  const handleButtonClick = () => {
    console.log("yehh clciked me");
    console.log(validateForm());
    if (validateForm()) {
      console.log("Form submitted:", formData);
      addItemToTableData();
    }
  };

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    let errors: Partial<FormData> = {};
    let isValid = true;

    // Validate first name
    if (!formData.fname) {
      errors.fname = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!formData.lname) {
      errors.lname = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Validate phone no
    if (formData.phoneNo.length != 10) {
      errors.phoneNo = "Please provide correct No";
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    // Validate dob
    if (!formData.date) {
      errors.date = "DOB is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <NavBar />
      <div className="home-wrapper">
        <div className="home-section-1">
          <span className="home-section-title">Table</span>
          <table>
            <tr>
              <th>Unique ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Mobile number</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th className="unique-header"></th>
            </tr>
            {items}
          </table>
        </div>
        <div className="home-section-2">
          <span className="home-section-title">Form</span>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              label="First Name"
              id="first-name"
              isError={!!formErrors.fname}
              errorText={formErrors.fname}
              value={formData.fname}
              onChange={handleInputChange("fname")}
            />

            <div className="spacer"></div>
            <CustomTextField
              label="Last Name"
              id="last-name"
              isError={!!formErrors.lname}
              errorText={formErrors.lname}
              value={formData.lname}
              onChange={handleInputChange("lname")}
            />
            <CustomTextField
              label="Email"
              id="email"
              isError={!!formErrors.email}
              errorText={formErrors.email}
              value={formData.email}
              onChange={handleInputChange("email")}
            />
            <CustomTextField
              label="Phone no"
              id="phone-no"
              isError={!!formErrors.phoneNo}
              errorText={formErrors.phoneNo}
              value={formData.phoneNo}
              onChange={handleInputChange("phoneNo")}
            />
            <CustomTextField
              label="Gender"
              id="gender"
              isError={!!formErrors.gender}
              errorText={formErrors.gender}
              value={formData.gender}
              onChange={handleInputChange("gender")}
            />
            <CustomTextField
              label="DOB"
              id="dob"
              isError={!!formErrors.date}
              errorText={formErrors.date}
              value={formData.date}
              onChange={handleInputChange("date")}
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
