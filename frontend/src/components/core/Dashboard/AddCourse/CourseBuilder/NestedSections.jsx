import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"

import Backdrop from '../../../../common/Backdrop';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/backendCallFunction/courseAPI';
import { setCourse } from '../../../../../reducer/slices/courseSlice';

function NestedSections({ handleEditSectionName }) {
    const { course } = useSelector(state => state.course)
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const [viewSubSection, setviewSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    // delete section
    async function handleDeleleSection(sectionId) {
        const data = { sectionId, courseId: course._id, courseName: course.courseName }
        const res = await deleteSection(token, data);

        if (res) {
            dispatch(setCourse(res))
        }
        setConfirmationModal(null);
    }

    // delete sub-section
    async function handleDeleteSubSection(subSectionId, sectionId) {
        const data = { sectionId, subSectionId, courseId: course._id }
        const res = await deleteSubSection(token, data);

        if (res) {
            // update courseContent specific section with new section data
            const updatedCourseContent = course.courseContent.map(section =>
                section._id === sectionId ? res : section
            )
            // update only courseContent which holds section data
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null);
    }

    return (
        <div>
            <div>
                {course?.courseContent.map((section) => (
                    <details key={section._id} className='mt-4' >

                        {/* DROPDOWN MENU: SECTION */}
                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>

                            {/* SECTION NAME */}
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>

                            {/* SECTION: EDIT/DELETE */}
                            <div className="flex items-center gap-x-3">
                                {/* EDIT */}
                                <button
                                    onClick={() => handleEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit className="text-xl text-richblack-300" />
                                </button>

                                {/* DELETE */}
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btnText1: "Delete",
                                            btnText2: "Cancel",
                                            btn1handler: () => handleDeleleSection(section._id),
                                            btn2handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                </button>

                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>

                        </summary>

                        {/* SUB-SECTION */}
                        <div className="px-6 pb-4">

                            {/* RENDERING ALL SUB-SECTION PRESENT IN A SECTION */}
                            {section?.subSection.map(data => (
                                <div key={data?._id}
                                    onClick={() => setviewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    {/* TITLE */}
                                    <div className="flex items-center gap-x-3 py-2 ">
                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">
                                            {data.title}
                                        </p>
                                    </div>

                                    {/* BUTTONS */}
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-x-3"
                                    >
                                        {/* EDIT */}
                                        <button
                                            onClick={() => setEditSubsection({ ...data, sectionId: section._id })}
                                        >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btnText1: "Delete",
                                                    btnText2: "Cancel",
                                                    btn1handler: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                    btn2handler: () => setConfirmationModal(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>

                                    </div>
                                </div>
                            ))}

                            {/* ADD NEW SUB-SECTIONS */}
                            <>
                                <button
                                    onClick={() => setAddSubSection(section._id)}
                                    className="mt-3 flex items-center gap-x-1 text-indigo-500 font-semibold"
                                >
                                    <FaPlus className="text-lg " />
                                    <p>Add Lecture</p>
                                </button>
                            </>
                        </div>

                    </details>
                ))}
            </div>

            {/* DISPLAY MODALS */}
            {   // If we are Trying to add a new Section 
                addSubSection ? (
                    <Backdrop onClick={() => setAddSubSection(null)}>
                        <SubSectionModal
                            modalData={addSubSection}
                            setModalData={setAddSubSection}
                            add={true}
                        />
                    </Backdrop>

                    // If we are Viewing a section
                ) : viewSubSection ? (
                    <Backdrop onClick={() => setviewSubSection(null)}>
                        <SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setviewSubSection}
                            view={true}
                        />
                    </Backdrop>

                    // If we are Trying to edit a Section
                ) : editSubsection && (
                    <Backdrop onClick={() => setEditSubsection(null)}>
                        <SubSectionModal
                            modalData={editSubsection}
                            setModalData={setEditSubsection}
                            edit={true}
                        />
                    </Backdrop>
                )
            }

            {/* DELETE CONFIRMATION MODAL */}
            {confirmationModal && (
                <Backdrop onClick={confirmationModal.btn2handler}>
                    <ConfirmationModal modalData={confirmationModal} />
                </Backdrop>
            )}

        </div>
    )
}

export default NestedSections