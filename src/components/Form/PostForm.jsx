import MyTextInput from "./MyTextField";
import MyTextArea from "./MyTextArea";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { useState } from "react";

function PostForm({ initialData, onSubmit, text, thumbnail }) {
  const [image, setImage] = useState(thumbnail || null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(5, "Must be greater than 3 characters")
          .required("Required"),
        slug: Yup.string().required("Required"),
        body: Yup.string()
          .required("Required")
          .min(50, "Post body must be greater than 50 characters"),
      })}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("body", values.body);
        if (image) formData.append("image", image);

        onSubmit(formData);
      }}
    >
      <Form encType="multipart/form-data">
        <MyTextInput
          label="Post title"
          name="title"
          type="text"
          placeholder="Enter Post title"
        />
        <MyTextInput
          label="Post slug"
          name="slug"
          type="text"
          placeholder="Enter post slug"
          directive="Separate each words with a hyphen"
        />
        <MyTextArea
          label="Post Body"
          name="body"
          placeholder="Enter Post Body"
        />
        <div className="flex flex-col space-y-2 mb-4 text-gray-600 font-montserrat">
          <label htmlFor="image" className="text-gray-700 ">
            Select Post Thumbnail
          </label>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-500 outline-none p-2  rounded-md"
          />
          {/* {image && <img src={URL.createObjectURL(image)} alt="Selected" />}
      {image && <button onClick={() => setImage(null)}>Remove Image</button>} */}
        </div>

        <div className="my-2">
          <button
            type="submit"
            className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
          >
            {text}
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default PostForm;
