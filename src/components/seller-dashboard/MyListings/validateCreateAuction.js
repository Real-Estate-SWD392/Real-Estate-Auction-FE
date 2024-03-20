import * as Yup from "yup";

export const validationCreateAuction = Yup.object().shape({
  day: Yup.number().min(0, "Day must be greater than or equal to 0"),
  hour: Yup.number().min(0, "Hour must be greater than or equal to 0"),
  minute: Yup.number().min(0, "Minute must be greater than or equal to 3"),
  second: Yup.number().min(0, "Second must be greater than or equal to 0"),
  startPrice: Yup.number()
    .min(1, "The start price must be more than 1$")
    .required("The start price is required."),
  priceStep: Yup.number()
    .min(1, "The price step must be more than 1$")
    .required("The price step is required."),
  buyNowPrice: Yup.number()
    .min(1, "The buy now price must be more than 1$")
    .required("The buy now is required."),
});
