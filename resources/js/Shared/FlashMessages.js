import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';

const IconSuccess = () => (
    <svg
        className="flex-row mr-2"
        style={{width:'16px',fill:'white',marginLeft:'1rem'}}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
    >
        <polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
    </svg>
);

const ButtonClose = ({ onClick }) => {
    const className = classNames('d-block d-flex justify-content-between');
    return (
        <button
            onClick={onClick}
            type="button"
            className="p-2 mr-2"
            style={{width:'1%',fill:'white',height:'1%',marginLeft:'83%',marginTop:'1%',border:'none',backgroundColor:'#38c172'}}
        >
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="6.908"
                height="6.908"
                viewBox="278.046 126.846 235.908 235.908"
            >
                <path d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396 210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38 244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396 279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62 244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z" />
            </svg>
        </button>
    );
};

export default () => {
    const [visible, setVisible] = useState(true);
    const { flash, errors } = usePage().props;

    useEffect(() => {
        setVisible(true);
    }, [flash]);

    return (
        <div>
            {flash.success && visible && (
                <div className="bg-success justify-content-center " style={{width:'87%',marginLeft:'5rem',marginBottom:'2rem',borderRadius:'4px'}}>
                    <div className="d-flex justify-content-start" style={{height:'48px'}}>
                        <IconSuccess />
                        <div className="py-5 text-white" style={{marginTop:'-34px'}}>
                            {flash.success}
                        </div>
                        <ButtonClose onClick={() => setVisible(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};
