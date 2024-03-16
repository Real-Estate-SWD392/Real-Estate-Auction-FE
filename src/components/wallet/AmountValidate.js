import * as Yup from "yup";

export const validationAmount = Yup.object().shape({
    amount: Yup.number().min(100, 'Amount must be more than 100$').max(10000000, 'The amount cannot more than 10,000,000$').required('Amount is required !'),
    
});
