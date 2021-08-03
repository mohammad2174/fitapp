import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import TextInput from './../../Shared/TextInput';

export default (props) => {
    const lead = props.lead;
    const reminder = props.reminder;
    const error = usePage();
    const errors = error.props.errors;

    const [values, setValues] = useState({
        note: '',
        reminder_id:reminder.id,
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/leads/view/reminder/close', values)
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
                        <h1 className='flex-lg-row'><InertiaLink className='float-left text-decoration-none' href='/leads/list'>Leads</InertiaLink>
                            <span className="breadcrumb-sep">/</span>
                            <InertiaLink href={route('lead.view', {lead})} className='text-decoration-none'>Lead details</InertiaLink>
                            <span className="breadcrumb-sep">/</span>
                            Reminder add note
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Add note</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <TextInput className='form-group'
                                               label='Note'
                                               name='note'
                                               type='text'
                                               id='note'
                                               errors={errors.note}
                                               onChange={handleChange}
                                               value={values.note}
                                    />
                                    <button className="btn btn-danger">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
