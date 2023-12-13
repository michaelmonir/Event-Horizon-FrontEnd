import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {signupValidation} from "../loginAndSignup/validations/signupValidation";
import ProxyApi from "../Apis/ProxyApis/ProxyApis";
import AdminApis from "../Apis/UserApis/AdminApis";

export default function AddingModeratorModal() {
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const signupFormik = useFormik({
        initialValues: {
            userName: "", firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        }, validationSchema: signupValidation, onSubmit: async (values, actions) => {
            const informationDto = {
                "id": 0,
                "userName": values.userName,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "email": values.email,
                "password": values.password,
                "role": "ROLE_MODERATOR",
                "gender": "MALE",
                "payPalAccount": "",
                "signInWithEmail": 0
            }
            try {
                await AdminApis.post("addModerator", informationDto)

                handleClose()
            } catch (error) {
                actions.resetForm();
                alert(error.response.data.message)
            }
        },
    });

    return (<div>
        <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
        >
            Add Moderator
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom', horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top', horizontal: 'right',
            }}
        >
            <Typography sx={{p: 2, height: 500}}>
                <form onSubmit={signupFormik.handleSubmit}>
                    <h2>Add Moderator</h2>

                    <input name={"userName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.userName && signupFormik.errors.userName ? "Input error" : "Input"}
                           type="text" placeholder="User Name "/>
                    {signupFormik.touched.userName && signupFormik.errors.userName ? (
                        <div className=" text-error">{signupFormik.errors.userName}</div>) : null}
                    <input name={"firstName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.firstName && signupFormik.errors.firstName ? "Input error" : "Input"}
                           type="text" placeholder="First Name"/>
                    {signupFormik.touched.firstName && signupFormik.errors.firstName ? (
                        <div className=" text-error">{signupFormik.errors.firstName}</div>) : null}
                    <input name={"lastName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.lastName && signupFormik.errors.lastName ? "Input error" : "Input"}
                           type="text" placeholder="Last Name"/>
                    {signupFormik.touched.lastName && signupFormik.errors.lastName ? (
                        <div className=" text-error">{signupFormik.errors.lastName}</div>) : null}
                    <input
                        name={"email"}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                        className={signupFormik.touched.email && signupFormik.errors.email ? "Input error" : "Input"}
                        type="email" placeholder="Email"/>
                    {signupFormik.touched.email && signupFormik.errors.email ? (
                        <div className=" text-error">{signupFormik.errors.email}</div>) : null}
                    <input name={"password"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.password && signupFormik.errors.password ? "Input error" : "Input"}
                           type="password" placeholder="Password"/>
                    {signupFormik.touched.password && signupFormik.errors.password ? (
                        <div className=" text-error">{signupFormik.errors.password}</div>) : null}

                    <input name={"confirmPassword"} onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? "Input error" : "Input"}
                           type="password" placeholder="Confirm Password"/>

                    {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? (
                        <div className=" text-error">{signupFormik.errors.confirmPassword}</div>) : null}
                    <Button variant="contained" type="submit">Sign up</Button>
                </form>
            </Typography>
        </Popover>
    </div>);
}