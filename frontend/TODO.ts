// TODO: Implement an upword arrow which bring user to top of the page.

// TODO: Change the setUser in authAPI.js so that we only include user ID in it and store only that data instead of whole user info
// TODO: try storing user Info or Id's in session instead of local storage. ✅
// TODO: fix bottom of login page when inspects. ⚔️
// TODO: password constraints during signup: pass must be 8 level.
// TODO: find ulternative to instead of storing user data in local storage. in profileSlice
///// TODO: Mobile view of NavBar
// TODO: try Implementing tilting effect on images similar to hkirat website.
// TODO: Update the Error page.
//? TODO: Check why are we using dispatch in SideBarLink: Its related to Course State will handle later
//? TODO: auto logout when token expires : already written the login need to implement
// TODO: for myprofile and setting part add a react router navigation link which directly navigate to the specific section of the setting page [profileEdit -> Edit profile section]. Do similar if needed anywhere also.
// TODO: create a purchase History tab in side Bar
///// TODO: try implementing a 3 option module in Enrolled course which shows [ALL, PENDING, COMPLETED] courses with filter.
// TODO: add skeleton data in enrolled courses and everywhere we need it.
///// TODO: make the enrolled courses section a grid similar to [https://www.udemy.com/home/my-courses/learning/]
// TODO: add logic for adding rating in RenderCartCourses
///// TODO: add rating in grid cards in EnrolledCourseTable
///// TODO: hide menu Bar in my-profile
// TODO: create a separate API point for category from Navbar: CATEGORY_API
// TODO: ADD GOOGLE AUTHENTICATION FEATURE in signupForm
// TODO: Add a backend function in global api where we call the auth middleware and check if the token is still valid or not and we can call this backend function call in useffect in every dashboard page.
// TODO: add one token checker call in add course section in INSTRUCTOR
// TODO: Make a dashboard for ADMIN where we have choices between Instructor and Student which shows a table of all the users with specific account type and by click on them we can we more detail with a special auth controller.
// TODO: add "already have an account log in button and do not have an account create button on login and signup"
//? TODO: the eye from login and signup is visible when side menu is open.
// TODO: check so that if upload dp is clicked no error is given in myprofile instead toast: Select an Image

//? <<<<<<< BACKEND TODO >>>>>>>> //
//  TODO BACKEND: Check if cookies are even working on the backend side and twik with their expiry time.
//? TODO: update all backend error responses with throw new error.
/////! TODO: when a user deleted his account delete related data from cloudinary also and when a user updates his dp delete previous data from cloudinary.
// TODO: add a limit on the size of video/picture to be uploaded if not followed give an error.
//! TODO: add tag to the course->section->sub-section videos so that we can delete once instructor account is deleted with option of deletion given to the instructor.
//above TODO: it can be done by using courses[] in user's dB (Instructor specific) and finding the courseName then deleting all resourses related to that tag.
//! TODO: ADDED CUSTOM COURSE IN MAIN ACCOUNT REMOVE IT BEFORE TESTING {PYTHON ONE}
//? Add a limit to video upload in subsection : 10MB
// TODO: Now, we have totalSectionDuration in each Section use that to add up the section duration and present it in enrolled courses.
// TODO: add custom modification in purchase email. {table including courseName+price / receipt of payment}
// TODO: update 'Home / Catalog / undefined' in catalog import page name form url.

//? <<<<<<< END TODO >>>>>>>> //
//! TODO: change tag of all the sample ID's data:images/videos: dp/sub-section videos
//! TODO: remove testData from enrolledCourses
//? TODO: remove the video from hero section and replace it with product images in a slider formation + tilt effect
//? TODO: remove package video-react from fe
//! TODO: make changes in auth controller so no one is able to create ADMIN account (even from postMan) and ADMIN priviledge on frontEnd.
//! TODO: remove all git link from emails and replace with site link.
