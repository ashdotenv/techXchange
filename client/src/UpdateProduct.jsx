import React, { useState } from "react";
import axios from "axios";

function UpdateProduct() {
  const [files, setFiles] = useState([]);

  function handleFileChange(event) {
    setFiles([...files, ...event.target.files]); // Append new files to the existing array
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("profile", file); // Append each file with the same field name "profile" to form data
      });
      axios.defaults.withCredentials = true;
      const response = await axios.post (
        "http://localhost:5000/imageTest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart form-data
          },
        }
      );

      console.log("Product updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Image(s):
          <input type="file" name="profile" onChange={handleFileChange} multiple />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
