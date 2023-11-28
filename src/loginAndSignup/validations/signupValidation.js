import * as Yup from "yup";

export const signupValidation = Yup.object().shape({
    firstName: Yup.string()
        .required("Required").min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
        .required("Required").min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            {message: "Must contain at least one uppercase, one lowercase, one number and one special case character"}
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Required")
});
