import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa';

function TagsInput({ name, label, placeholder, register, errors, setValue }) {

    const { editCourse, course } = useSelector(state => state.course)
    const [tags, setTags] = useState([])

    useEffect(() => {
        register(name, { required: true })

        // when edit course
        if (editCourse) {
            setTags(course?.tag);
            setValue(name, course?.tag);
        }

    }, [])


    return (
        <div>
            <label htmlFor={name} className='text-sm text-richblack-5'>
                {label}<sup className='text-pink-200'>*</sup>
            </label>

            {/* UPPER SECTION */}
            <div className='flex flex-wrap gap-2 m-2'>
                {tags.map((tag, index) => (
                    <div key={index} className='m-1 flex items-center rounded-full bg-indigo-600 px-2 py-1 text-sm text-richblack-5'>

                        {/* TAG-VISIBLE */}
                        <span className='text-richblack-5'>{tag}</span>

                        {/* CLOSE BUTTON */}
                        <button
                            type='button'
                            onClick={() => {
                                const updateTags = [...tags];
                                updateTags.splice(index, 1);
                                setTags(updateTags);
                                setValue(name, updateTags);
                            }}
                            className='ml-2 text-richblack-5'
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>

            {/* INPUT SECTION */}
            <input
                type="text"
                id={name}
                placeholder={placeholder}
                className='form-style w-full'

                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        setTags([...tags, e.target.value]);
                        setValue(name, [...tags, e.target.value]);
                        e.target.value = "";
                    }
                }}
            />

            {errors[name] &&
                <span className='text-xs text-pink-200'>Tags are required</span>
            }
        </div>
    )
}

export default TagsInput