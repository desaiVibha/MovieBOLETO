import './SignIn.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
    username: Yup.string('Username is invalid').required('Username is required'),
    password: Yup.string().required('Password cannot be empty')
})

const initialValues = {
    username: "",
    password: ""
}

function SignIn() {
    const navigate = useNavigate();
    const [getAccessToken, setGetAccessToken] = useState(null)
    const onSubmit = data => {
        if (data) {
            fetch("http://127.0.0.1:8000/movie/signin/", {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                // Converting to JSON
                .then(response => response.json())
                // Displaying results to console
                .then(tokens => {
                    console.log(tokens.access);
                    localStorage.setItem('access', tokens.access);
                    fetch("http://127.0.0.1:8000/movie/user-data/", {
                        method: "GET",
                        headers: { 'Authorization': 'Bearer ' + tokens.access}
                    })
                        .then(response => response.json())
                        .then(json => { console.log(json); navigate("/", { state: json }) })
                });



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
            <div className="login-complete">
                <h1 className="title-login">Login</h1>
                <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                    <Form>
                        <div className='input-format'>
                            <div>
                                <Field className='email-format' type="username" name="username" placeholder='Username'></Field>
                            </div>
                            <ErrorMessage name='username' />

                            <div>
                                <Field className='pass-format' type="password" name="password" placeholder='Password'></Field>
                            </div>
                            <ErrorMessage name='password' />

                            {/* <p className='para'>Don't have an account?<p className='here' onClick={() => { setsignupState(true); setloginState(false); }}>Sign up here.</p></p> */}

                            <button className="login-btn" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                                <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>&nbsp;Login</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}
export default SignIn