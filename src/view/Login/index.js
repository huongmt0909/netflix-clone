import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import './style.scss'
import { useState } from 'react';
import ShowToast from '../../utils/ShowToast'
import { authAction } from '../../redux/slice/authSlice'
import { loginSelector } from '../../redux/selector'

function Login() {
    const [showPass, setShowPass] = useState(true)
    const dispatch = useDispatch()
    const loginList = useSelector(loginSelector)


    const formData = useFormik({
        initialValues: {
            value: "",
            password: "",
        },
        validationSchema: Yup.object({
            value: Yup.string()
                .required("This field cannot be left blank!"),
            password: Yup.string()
                .required("No password entered!")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Password minimum 8 characters, at least one letter and one number!"
                ),
        }),
        onSubmit: (values) => {
            if (loginList.isFetching === false) {
                dispatch(authAction.login({ values, ShowToast }))
            }
        },
    });

    const handleSetShowPass = () => {
        setShowPass(!showPass)
    }

    return (
        <div className="login">
            <form className='form_login' onSubmit={formData.handleSubmit}>
                <h1>Login</h1>
                <div className='form_group'>
                    <label>ACCOUNT:</label>
                    <div className='form_input'>
                        <input
                            placeholder='Account name / Email'
                            id='value'
                            name='value'
                            value={formData.values.value}
                            onChange={formData.handleChange}
                            onBlur={formData.handleBlur}
                        />
                    </div>
                    <p className='form_error'>
                        {(formData.touched.value && formData.errors.value) && formData.errors.value}
                    </p>
                </div>
                <div className='form_group'>
                    <label>PASSWORD:</label>
                    <div className='form_input'>
                        <input
                            placeholder='password'
                            type={showPass ? 'password' : 'text'}
                            id='password'
                            name='password'
                            value={formData.values.password}
                            onChange={formData.handleChange}
                            onBlur={formData.handleBlur}
                        />
                        <span onClick={handleSetShowPass}>
                            {
                                showPass === false &&
                                <i><FaEye /></i>
                            }
                            {
                                showPass &&
                                <i><FaEyeSlash /></i>
                            }
                        </span>
                    </div>
                    <p className='form_error'>{(formData.touched.password && formData.errors.password) && formData.errors.password}</p>
                </div>
                <div className='form_control'>
                    <button type='submit' className='btn_login'
                        style={loginList.isFetching ? {cursor:'not-allowed'} : {cursor:'pointer'}}
                    >Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
