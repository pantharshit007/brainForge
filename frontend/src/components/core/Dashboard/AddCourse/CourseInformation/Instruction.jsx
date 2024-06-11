import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Instruction({ name, label, register, errors, setValue, getValues }) {

    const { editCourse, course } = useSelector(state => state.course);

    const [instruction, setInstruction] = useState("");
    const [instructionList, setInstructionList] = useState([]);


    // add instruction to the list of instructions
    function handleAddInstruction() {
        if (instruction) {
            setInstructionList([...instructionList, instruction]);
            setInstruction('');
        }
    }

    // remove specific instruction form the list of instructions
    function handleRemoveInstruction(index) {
        const updateInstructionList = [...instructionList];
        updateInstructionList.splice(index, 1);
        setInstructionList(updateInstructionList);
    }

    useEffect(() => {
        register(name, { required: true })
    }, [register])

    // during editing phase
    useEffect(() => {
        setValue(name, instructionList)
        if (editCourse) {
            setInstructionList(course?.instructions);
            setValue(name, course?.instructions)
        }

    }, [instructionList])

    return (
        <div>
            <label htmlFor={name} className='text-sm text-richblack-5'>
                {label} <sup className='text-pink-200'>*</sup>
            </label>

            {/* INPUT BOX AND ADDED INSTRUCTIONS */}
            <div>
                <input
                    type="text"
                    id={name}
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    className='form-style w-full'

                />

                <button
                    type='button'
                    onClick={handleAddInstruction}
                    className='font-semibold text-indigo-500 mt-3'
                >
                    Add
                </button>
            </div>

            {/* ADDED INSTRUCTIONS */}
            {instructionList.length > 0 && (
                <ul>
                    {instructionList.map((instruction, index) => (
                        <li key={index} className='flex items-center text-richblack-5'>
                            <span>{index + 1}. {instruction}</span>

                            <button
                                type='button'
                                onClick={() => handleRemoveInstruction(index)}
                                className='ml-2 text-xs text-pure-greys-300'
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    {label} is required
                </span>
            )}

        </div>
    )
}

export default Instruction