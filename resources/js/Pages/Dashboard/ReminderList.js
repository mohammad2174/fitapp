import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default ({reminders}) => {

    return (
            <div className='card'>
                <div className='card-header'>Reminders list</div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {reminders.map(({ id, lead, reminder }) => {
                                return (
                            <li className="list-group-item" key={id}>
                                <InertiaLink className={'text-decoration-none'} href={route('reminder.view', [lead , id])}><strong>{lead.name}</strong><br/>{reminder}</InertiaLink>
                            </li>
                                );
                            })}
                        </ul>
                    </div>
            </div>
    );
};
