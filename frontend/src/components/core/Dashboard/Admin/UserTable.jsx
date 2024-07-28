import React, { useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';

import IconBtn from '../../../common/IconBtn'
import { disableCategory } from '../../../../services/backendCallFunction/adminAPI';
import { setCategories } from '../../../../reducer/slices/courseSlice';

createTheme('dark', {
    text: {
        primary: '#c5c7d4',
        secondary: '#2aa198',
    },
    background: {
        default: '#161d29',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },

})

const customStyles = {
    rows: {
        style: {
            minHeight: '52px',
        },
    },
    headCells: {
        style: {
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '20px',
            fontSize: '15px',
            backgroundColor: '#242a33',
        },
    },
    cells: {
        style: {
            paddingLeft: '20px',
            width: '50px'

        },
    },

};

function UserTable(props) {

    const { token } = useSelector(state => state.auth)

    const [newData, setNewData] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    // values change
    const handleChange = ({ selectedRows }) => {
        setNewData(selectedRows)
    };

    async function submitHandler() {
        const res = await disableCategory(token, { newData: newData })
        dispatch(setCategories(res))
        setLoading(false)
    }


    return (
        <div className='mb-8'>
            <DataTable
                // title="User List"
                keyField='_id'
                columns={props.columns}
                data={props.data}
                pagination
                paginationPerPage={5}
                highlightOnHover
                customStyles={customStyles}
                theme='dark'
                selectableRows={props.selectableRows || false}
                onSelectedRowsChange={handleChange}
                selectableRowSelected={props.rowSelectCritera || undefined}
            />

            {props.btn && (
                <div className='mt-6 w-full flex justify-end '>
                    <IconBtn
                        text={'Save Changes'}
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            submitHandler();
                        }}
                        customClasses={`${loading && 'bg-richblack-500 cursor-not-allowed'}`}
                    />
                </div>
            )}

        </div>
    )
}

export default UserTable