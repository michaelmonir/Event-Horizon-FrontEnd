import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            {message: "Must contain at least one uppercase, one lowercase, one number and one special case character"}
        )
});
