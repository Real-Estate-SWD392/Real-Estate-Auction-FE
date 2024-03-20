import * as Yup from "yup";

export const validationProperty = Yup.object().shape({
  street: Yup.string().required("This field is required"),
  city: Yup.string().required("Please select a province"),
  district: Yup.string().required("Please select a district"),
  ward: Yup.string().required("Please select a ward"),
  image: Yup.array()
    .min(1, "At least one image is required")
    .max(5, "You can only add 5 images")
    .required("Please upload at least one image"),
  type: Yup.string().required("Please select a type"),
  size: Yup.number()
    .min(50, "Property size must be at least 50 m2")
    .required("Property size is required"),
  bedRoom: Yup.number()
    .min(1, "Bedroom must be at least 1")
    .required("Bedroom is required"),
  bathRoom: Yup.number()
    .min(1, "Bathroom must be at least 1")
    .required("Bathroom is required"),
  description: Yup.string().required("This field is required"),
  pdf: Yup.array()
    .min(1, "Please upload at least one PDF file")
    .required("Please upload at least one PDF file"),
});
