// TODO: Implement an upword arrow which bring user to top of the page.
///// TODO: try storing user Info or Id's in session instead of local storage. ✅
// TODO: fix bottom of login page when inspects. ⚔️
// TODO: password constraints during signup: pass must be 8 level.
// TODO: find Alternative to instead of storing user data in local storage. in profileSlice
///// TODO: Mobile view of NavBar
// TODO: Update the Error page.
//? TODO: auto logout when token expires : already written the login need to implement
// TODO: for myprofile and setting part add a react router navigation link which directly navigate to the specific section of the setting page [profileEdit -> Edit profile section]. Do similar if needed anywhere also.
// TODO: create a purchase History tab in side Bar
///// TODO: try implementing a 3 option module in Enrolled course which shows [ALL, PENDING, COMPLETED] courses with filter.
// TODO: add skeleton data in enrolled courses and everywhere we need it.
///// TODO: make the enrolled courses section a grid similar to [https://www.udemy.com/home/my-courses/learning/]
///// TODO: add logic for adding rating in RenderCartCourses
///// TODO: add rating in grid cards in EnrolledCourseTable
///// TODO: hide menu Bar in my-profile
///// TODO: create a separate API point for category from Navbar: CATEGORY_API ✅
// TODO: ADD GOOGLE AUTHENTICATION FEATURE in signupForm: issue(default:Student Account)
// TODO: Add a backend function in global api where we call the auth middleware and check if the token is still valid or not and we can refresh the token + add a timer in a auth slice which automatically remove the token/logout eg:3h
// TODO: Make a dashboard for ADMIN where we have choices between Instructor and Student which shows a table of all the users with specific account type and by click on them we can we more detail with a special auth controller.
// TODO: add "already have an account log in button and do not have an account create button on login and signup"
//? TODO: the eye from login and signup is visible when side menu is open.
///// TODO: check so that if upload dp is clicked no error is given in myprofile instead toast: Select an Image.
// TODO: fix the footer in Smaller screen remove unnecessary elements so that it looks elegent.
// TODO: add a counter in about/matrics section
// TODO: add skeleton in rating and review
// TODO: update 'Home / Catalog / undefined' in catalog page (before page loads course name is undefined).

//? <<<<<<< BACKEND TODO >>>>>>>> //
//  TODO BACKEND: Check if cookies are even working on the backend side and twik with their expiry time.
//? TODO: update all backend error responses with throw new error.
/////! TODO: when a user deleted his account delete related data from cloudinary also and when a user updates his dp delete previous data from cloudinary.
// TODO: add a limit on the size of video/picture to be uploaded if not followed give an error.
//! TODO: add tag to the course->section->sub-section videos so that we can delete once instructor account is deleted with option of deletion given to the instructor (do you want to delete all courses along with account).
//above TODO: it can be done by using courses[] in user's dB (Instructor specific) and finding the courseName then deleting all resourses related to that tag.
//! TODO: ADDED CUSTOM COURSE IN MAIN ACCOUNT REMOVE IT BEFORE TESTING {PYTHON ONE}
//? Add a limit to video upload in subsection : 10MB
///// TODO: add custom modification in purchase email. {table including courseName+price / receipt of payment}
//? TODO: is it possible that any other instructor remove the section or course of a different instructor? I think yes.
//? extended: we can use the userId to check if the courseId is present in the instructor[course]
// TODO: think of a way to update courseStatus once all the lectures in a course are marked as completed.
//! TODO: add functionality of refresh token

//? <<<<<<< END TODO >>>>>>>> //
//! TODO: change tag of all the sample ID's data:images/videos: dp/sub-section videos
/////! TODO: remove testData from enrolledCourses
//? TODO: remove the video from hero section and replace it with product images in a slider formation + tilt effect
//? TODO: remove package video-react from fe
//! TODO: make changes in auth controller so no one is able to create ADMIN account (even from postMan) and ADMIN priviledge on frontEnd.
//! TODO: remove all git link from emails and replace with site link.
//! TODO: update the link in uploadVideo where we are passing video url to reactComponent for display since URL.encoded is deprecated and risky.
//! TODO: remove test data rom ratingSlider
