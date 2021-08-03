import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';

export default (props) => {
  const packages = props;
  const  filters  = usePage();
  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    role: filters.role || '', // role is used only on users page
    search: filters.search || '',
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: '',
      search: '',
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length
        ? pickBy(values)
        : { remember: 'forget' };
      Inertia.replace(route(route().current(), query));
    }
  }, [values]);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));

    if (opened) setOpened(false);
  }

  return (
    <div className='row mb-3'>
                <div className='col-md-12'>
                <form className='form-inline'>
                    <input type='text' className='form-control mr-3 col-md-3' name='search' value={values.search} onChange={handleChange} placeholder='Search by name or email'></input>
                    <select name='role' className='form-control mr-3 col-md-2' value={values.role} onChange={handleChange}>
                    <option value='0'>All</option>
                        {packages.props.map(
                        ({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        )
                    )}
                    </select>
                    {/*<select name='role' className='form-control mr-3 col-md-2' value={values.role} onChange={handleChange}>*/}
                        {/*<option value='0'>All</option>*/}
                        {/*<option value='1'>fg</option>*/}
                        {/*<option value='2'>dfaa</option>*/}
                        {/*<option value='3'>any</option>*/}
                        {/*<option value='4'>fg</option>*/}
                    {/*</select>*/}
                    <button type="button" onClick={reset}>Reset</button>
                </form>
                </div>
            </div>
  );
};
