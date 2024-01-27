import * as Yup from "yup";

export const validationPassword = Yup.object().shape({
    password: Yup.string()
    .min(5, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include a number, a letter, and a special character."
    )
    .required("Password is required"),
});

export const validationUsername = Yup.object