import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'
import { useSelector } from 'react-redux'

import Tab from '../../../common/Tab'
import { USER_ROLE } from '../../../../utils/constant';
import { adminDashboard } from '../../../../services/backendCallFunction/adminAPI';
import useDebouncer from '../../../../hooks/useDebouncer';

const tabData = [
  {
    id: 1,
    tabName: "Everyone",
    type: USER_ROLE.ALL,
  },
  {
    id: 2,
    tabName: "Student",
    type: USER_ROLE.STUDENT,
  },
  {
    id: 3,
    tabName: "Instructor",
    type: USER_ROLE.INSTRUCTOR,
  },
]

const columns = [
  {
    name: 'Account Type',
    selector: row => row.accountType,
  },
  {
    name: 'Name',
    selector: row => `${row.firstName} ${row.lastName}`,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
];

function AdminDash() {

  const { token } = useSelector(state => state.auth);

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState(USER_ROLE.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = React.useRef(null);

  const debouncedValue = useDebouncer(searchTerm, 500);

  // search functionality
  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }

  // fetch data
  useEffect(() => {
    async function getData() {
      const res = await adminDashboard(token);

      if (res?.length) {
        setData(res)
        setFilteredData(res);
      }
    }
    getData()

  }, [token])

  // Filter data based on the selected filter
  useEffect(() => {
    const filtered = filter === USER_ROLE.ALL
      ? data
      : data.filter(user => user.accountType === filter);

    // Further filter by search term
    const searchedData = filtered.filter(user => {
      return `${user.firstName} {${user.lastName}`.toLowerCase().includes(debouncedValue.toLowerCase())
    })
    setFilteredData(searchedData);

  }, [data, filter, debouncedValue])

  // Focus on search input when Ctrl/Cmd + K is pressed
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [])

  return (
    <div className='mb-7'>

      <div className='flex items-center justify-between'>
        <p className='text-4xl font-medium text-richblack-50 '>User List</p>

        <div className='text-md font-mono text-richblack-50 flex gap-x-2 items-center'>
          <p className='h-2 w-2 bg-green-500 shadow-sm shadow-green-300 inline-block rounded-full'> </p>
          Active Users:
          <span>{data.length}</span>
        </div>
      </div>

      <div className='flex max-md:flex-col md:items-center justify-between max-md:mb-4'>
        <Tab tabData={tabData} field={filter} setField={setFilter} />

        <input
          ref={searchInputRef}
          type="text"
          name='firstName'
          id='firstName'
          placeholder='ctrl+k '
          onChange={handleSearch}
          className=' rounded-md bg-richblack-700 text-richblack-50 py-2 px-3 outline-none'
        />

      </div>

      <UserTable data={filteredData} columns={columns} />
    </div>
  )
}

export default AdminDash

