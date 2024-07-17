import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Backdrop from '../components/common/Backdrop';
import ReviewModal from '../components/core/ViewCourse/ReviewModal';
import VideoDetailSideBar from '../components/core/ViewCourse/VideoDetailSideBar';
import { fetchFullCourseDetail } from '../services/backendCallFunction/courseAPI';
import { setCompletedLeactures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../reducer/slices/viewCourseSlice';
import Footer from '../components/common/Footer';

function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reviewModal, setReviewModal] = useState(false);

  // setting the the course data in state
  useEffect(() => {
    async function fetchCourseData() {
      const res = await fetchFullCourseDetail(token, { courseId }, dispatch, navigate);

      dispatch(setCourseEntireData(res?.courseDetails));
      dispatch(setCourseSectionData(res?.courseDetails?.courseContent));
      dispatch(setCompletedLeactures(res?.completedVideos));

      let lectures = 0;
      res?.courseDetails?.courseContent.map(section => (
        lectures += section.subSection.length
      ))
      dispatch(setTotalNoOfLectures(lectures));
    }
    fetchCourseData();
  }, [courseId, token, dispatch])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* VIDEO SIDE BAR */}
        <div>
          <VideoDetailSideBar setReviewModal={setReviewModal} />
        </div>

        <div className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-">
          <Outlet />
        </div>

      </div>

      <Footer />

      {/* RATING & REVIEW MODAL*/}
      {reviewModal &&
        <Backdrop onClick={() => setReviewModal(false)}>
          <ReviewModal setReviewModal={setReviewModal} />
        </Backdrop>
      }
    </>
  )
}

export default ViewCourse