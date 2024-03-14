import './SignUp.css';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    name: Yup.string('Invalid name').required('First name is required!').min(3, "Name cannot be less than 3 characters").max(30, "Name is too long!"),
    email: Yup.string('Email type invalid').required('Email is required').email('Email type invalid'),
    password: Yup.string().required('Password cannot be empty').min(6, 'Password needs to be minimum of 6 characters').max(12, 'Password is too long'),
    username: Yup.string('Invalid username').required('Username is required!').min(3, "Username cannot be less than 3 characters").max(30, "Username is too long!"),
    mobileNumber: Yup.number('Invalid mobile number').required('Mobile number is required!').positive('Invalid mobile Number')
})

const initialValues = {
    name: "",
    email: "",
    password: "",
    username: "",
    mobileNumber: ""
}
function SignUp() {
    /*  const [values, setValues] = useState([])
     const onSubmit = data => {
         if (data) {
             setValues(() => [{
                 name: data.name,
                 email: data.email,
                 password: data.password,
                 username: data.username,
                 mobileNumber: data.mobileNumber
             }]);
         }       
     }
     useEffect(() => {
         console.log('Success')
         console.log(values)
     }, [values]); */
    const navigate = useNavigate();
    const onSubmit = data => {
        if (data) {
            fetch("http://127.0.0.1:8000/movie/signup/", {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    mobileNumber: data.mobileNumber
                }),
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                // Converting to JSON
                .then(response => response.json())
                // Displaying results to console
                .then(json => { console.log(json); alert('Thank you for joining Us. Please log in now to continue!'); navigate('/signin') });
        }
    }
    return (
        <>
            <nav className="navbar sticky-top navbar-light bg-light navbar-background">
                <nav className="navbar navbar-light bg-light navbar-left">
                    <a className="navbar-brand" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film edit-color" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                        </svg>&nbsp;
                        <b>BOLETO</b>
                    </a>
                    <a className="nav-link" href="/"><b>Home</b></a>
                </nav>
            </nav>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <div className="signup-complete">
                    <h1 className="title-signup">Sign Up</h1>
                    <Form>
                        <div className='input-format-signup'>
                            <div>
                                <Field id='name' className='fname-format-signup' type="text" name="name" placeholder='Name'></Field>
                            </div>
                            <div className='error' ><ErrorMessage name='name' /></div>

                            <div>
                                <Field id='email' className='email-format-signup' type="email" name="email" placeholder='E-mail'></Field>
                            </div>
                            <div className='error' ><ErrorMessage className='error' name='email' /></div>

                            <div>
                                <Field id='password' className='pass-format-signup' type="password" name="password" placeholder='Password'></Field>
                            </div>
                            <div className='error' ><ErrorMessage className='error' name='password' /></div>

                            <div>
                                <Field id='username' className='lname-format-signup' type="text" name="username" placeholder='Username'></Field>
                            </div>
                            <div className='error' ><ErrorMessage className='error' name='username' /></div>

                            <div>
                                <Field id='mobileNumber' className='mobile-format' type="number" name="mobileNumber" placeholder='Mobile Number'></Field>
                            </div>
                            <div className='error' ><ErrorMessage className='error' name='mobileNumber' /></div>

                        </div>

                        <p className='paraSign'>Already have an account? <p className='here-su' onClick={() => navigate("/signin")}>Login here.</p></p>

                        <button className="signup-btn" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>&nbsp;Sign Up</button>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
export default SignUp