import React, { useState } from 'react';
import TextInput from './../../Shared/TextInput';
import {InertiaLink} from "@inertiajs/inertia-react";
import Layout from './../../Shared/Layout';
import {Inertia} from "@inertiajs/inertia";

export default (props) => {
    const packages = props.packages
    // console.log(packages)
    const [values, setValues] = useState({
        id:packages.id,
        name:packages.name || '',
        amount:packages.amount || '',
        number_of_days:packages.number_of_days || '',
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/packages/update', values)
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
        <Layout>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col-md-12'>
                        <h1>
                            <InertiaLink href={route('package.list')} className='text-decoration-none'>Packages</InertiaLink>
                            <span className="breadcrumb-sep">/</span>
                            Package details
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className='card'>
                            <div className='card-header'>List of packages</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <TextInput className='form-group'
                                               label='Name'
                                               name='name'
                                               type='text'
                                               id='name'
                                               onChange={handleChange}
                                               value={values.name}
                                    />
                                    <TextInput className='form-group'
                                               label='Amount'
                                               name='amount'
                                               type='text'
                                               id='amount'
                                               onChange={handleChange}
                                               value={values.amount}
                                    />
                                    <TextInput className='form-group'
                                               label='Number of days'
                                               name='number_of_days'
                                               type='number'
                                               id='number_of_days'
                                               onChange={handleChange}
                                               value={values.number_of_days}
                                    />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-success">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
