import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import TextInput from './../../Shared/TextInput';

export default (props) => {
    const error = usePage();
    const errors = error.props.errors;

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/login', values)
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
            <div className='container pt-5 mr-5'>
                <form className='col-md-11' onSubmit={handleSubmit}>
                <div className='card'>
                    <div className='card-header'>Login</div>
                    <div className="card-body">
                        <TextInput className='form-group'
                                   label='email'
                                   name='email'
                                   type='email'
                                   id='email'
                                   tabIndex='1'
                                   onChange={handleChange}
                                   errors={errors.email}
                                   value={values.email}
                        />
                        <TextInput className='form-group'
                                   label='password'
                                   name='password'
                                   type='password'
                                   id='password'
                                   tabIndex='1'
                                   onChange={handleChange}
                                   errors={errors.password}
                                   value={values.password}
                        />
                        <div className="row">
                            <div className="col-md-12"><button className="btn btn-primary">Login</button>
                                <a className="float-right" href="register">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
    );
};
