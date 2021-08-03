import React, { useState } from 'react';
import Layout from './../../Shared/Layout';
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import TextInput from "../../Shared/TextInput";
import {Inertia} from "@inertiajs/inertia";

export default (props) => {
    const lead = props.lead;
    const reminder = props.reminder;
    const error = usePage();
    const errors = error.props.errors;

    const [values, setValues] = useState({
        reminder:reminder.reminder,
        reminder_date:reminder.reminder_date,
        reminder_id:reminder.id,
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/leads/view/reminder/update', values)
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
                            Reminder view
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Reminder view</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <TextInput className='form-group'
                                               label='Reminder'
                                               name='reminder'
                                               type='text'
                                               id='reminder'
                                               errors={errors.reminder}
                                               onChange={handleChange}
                                               disabled
                                               value={reminder.reminder}
                                    />

                                    <TextInput className='form-group'
                                               label='Reminder date'
                                               name='reminder_date'
                                               type='date'
                                               id='reminder_date'
                                               errors={errors.reminder_date}
                                               onChange={handleChange}
                                               disabled
                                               value={reminder.reminder_date}
                                    />
                                    <button className="btn btn-success mr-1">Add reminder</button>
                                    <InertiaLink href={route('reminder.note', [lead,reminder])} className="btn btn-outline-danger">Close reminder</InertiaLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
