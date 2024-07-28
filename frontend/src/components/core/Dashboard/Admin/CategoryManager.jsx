import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'
import { useSelector, useDispatch } from 'react-redux';

import { fetchCourseCategories } from '../../../../services/backendCallFunction/categoryAPI';

const columns = [
    {
        name: 'Category Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
    {
        name: 'Active status',
        selector: row => row.active ? '🟢 Active' : '🔴 Inactive',
        sortable: true,
    },
];

function CategoryManager() {
    const { categories } = useSelector(state => state.course)
    const [data, setData] = useState([])

    const dispatch = useDispatch()

    // fetch data
    useEffect(() => {
        async function getData() {
            const res = await fetchCourseCategories();

            if (res?.length) {
                setData(res)
            }
        }
        getData()
    }, [dispatch, categories]);

    const rowSelectCritera = row => row.active === true;


    return (
        <div>
            <p className='text-4xl font-medium text-richblack-50 mb-5'>
                Category Manager</p>

            <UserTable
                data={data}
                columns={columns}
                selectableRows={true}
                rowSelectCritera={rowSelectCritera}
                btn={true}
            />
        </div>
    )
}

export default CategoryManager