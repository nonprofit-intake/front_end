import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './register.styles.scss'
import * as Yup from 'yup';
import './register.styles.scss'


const Register = () => {
    const [errors, setErrors] = useState({
        name: '',
        email: "",
        password: '',
        confirmPassword: ''
    })

    const [formValues, setFormValues] = useState({
        name: '',
        email: "",
        password: '',
        confirmPassword: ''
    });


    const formSchema = Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Must be a valid email address.').required('Must include email address.'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is Required'),
        confirmPassword: Yup.mixed()
            .oneOf([formValues.password], 'passwords must match')
            .required('Please confirm your password')
    });


    const handleChange = (e) => {
        e.persist();
        Yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [e.target.name]: ''
                });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.message
                });
            });

        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = (e) => {
        e.preventDefault();
        formSchema.isValid(formValues).then((valid) => {
            if (valid) {
                // dispatch(register(formValues, history))
            } else if (!valid) {
                // setting global error
                // dispatch({ type: 'ERROR', payload: { error: 'Please Fill Out All Fields' } });
            }
        });
    };

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        });
    };
    return (
        <form className="form-container" onSubmit={registerUser}>
            <div className="text-field-containers">


                <TextField
                    value={formValues.name}
                    onChange={handleChange}
                    type="text"
                    label="name"
                    name="name"
                    required
                />


                {errors.email.length ?
                    <TextField
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        label="Email"
                        name="email"
                        required
                        error
                        helperText={errors.email}
                    />
                    :
                    <TextField
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        label="Email"
                        name="email"
                        required
                    />}

                {errors.password.length ?
                    <TextField
                        value={formValues.password}
                        onChange={handleChange}
                        type="password"
                        label="Password"
                        name="password"
                        required
                        error
                        helperText={errors.password}
                    /> :
                    <TextField
                        value={formValues.password}
                        onChange={handleChange}
                        type="password"
                        label="Password"
                        name="password"
                        required
                    />
                }

                {errors.confirmPassword.length ?
                    <TextField value={formValues.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        label="confirm password"
                        name="confirmPassword"
                        required
                        error
                        helperText={errors.confirmPassword}
                    >

                    </TextField>

                    :

                    <TextField value={formValues.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        label="confirm password"
                        name="confirmPassword"
                        required>
                    </TextField>

                }

                {errors.password.length || errors.confirmPassword.length || errors.email.length
                    ?
                    <Button disabled type="submit" color="secondary" variant="outlined" id='submit-btn'>
                        Register
                    </Button>
                    :
                    <Button type="submit" color="secondary" variant="outlined" id='submit-btn'>
                        Register
				    </Button>
                }

            </div>
        </form>
    );
};

export default Register;