import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import TextInput from './../../Shared/TextInput';

export default (props) => {
    const lead = props.lead;
    const error = usePage();
    const errors = error.props.errors;

    const [values, setValues] = useState({
        reminder: '',
        reminder_date: '',
        lead_id:lead.id,
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/leads/view/reminder/save', values)
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
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='flex-lg-row'><InertiaLink className='float-left text-decoration-none' href='/leads/list'>Leaders</InertiaLink>
                            <span className="breadcrumb-sep">/</span>
                            <InertiaLink href={route('lead.view', {lead})} className='text-decoration-none'>Lead details</InertiaLink>
                            <span className="breadcrumb-sep">/</span>
                            Reminder add
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Add reminder</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                            <TextInput className='form-group'
                                                       label='Reminder'
                                                       name='reminder'
                                                       type='text'
                                                       id='reminder'
                                                       errors={errors.reminder}
                                                       onChange={handleChange}
                                                       value={values.reminder}
                                            />

                                            <TextInput className='form-group'
                                                       label='Reminder date'
                                                       name='reminder_date'
                                                       type='date'
                                                       id='reminder_date'
                                                       errors={errors.reminder_date}
                                                       onChange={handleChange}
                                                       value={values.reminder_date}
                                            />
                                        <button className="btn btn-success">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
