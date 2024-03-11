import * as Yup from "yup";

export const validationPassword = Yup.object().shape({
  password: Yup.string()
    .min(5, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include a number, a letter, and a special character."
    )
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const validationRegister = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(5, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include a number, a letter, and a special character."
    )
    .required("Password is required"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
