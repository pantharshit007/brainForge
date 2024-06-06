import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../../services/backendCallFunction/profileAPI'
import EnrolledCourseTable from './EnrolledCourseTable'
import Tab from '../../../common/Tab'
import { COURSE_COMPLETION_STATUS } from '../../../../utils/constant'

function EnrolledCourses() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const [filter, setFilter] = useState(COURSE_COMPLETION_STATUS.ALL)

    // calling backend function
    async function getFunction() {
        const res = await getUserEnrolledCourses(token, dispatch, navigate)
        // const testData = [
        //     {
        //         "_id": "652268b213ce3982b0500f13",
        //         "courseName": "Full Stack MERN Developer",
        //         "courseDescription": "Become a proficient Full Stack MERN Developer with our comprehensive course. This program covers the entire spectrum of web development, equipping you with the skills to build robust and dynamic applications. You'll master key technologies such as MongoDB, Express.js, React, and Node.js, enabling you to create seamless user experiences and handle server-side operations.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": "Comprehensive Skillset\r\nIn-Demand Expertise\r\nCareer Advancement\r\n Problem Solving\r\n Flexibility\r\n Strong Portfolio",
        //         "courseContent": [
        //             {
        //                 "_id": "652268ef13ce3982b0500f17",
        //                 "sectionName": " Introduction to Full Stack Development",
        //                 "subSection": [
        //                     {
        //                         "_id": "65226a4513ce3982b0500f1c",
        //                         "title": "What is Full Stack Development?",
        //                         "timeDuration": "6.573233",
        //                         "description": "Full Stack Development encompasses expertise in both front-end and back-end technologies, allowing developers to handle all aspects of web application development. This role involves designing user interfaces, implementing functionality, and managing databases. A Full Stack Developer is capable of building seamless, end-to-end solutions, making them highly versatile in the software development process.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696754244/StudyNotion/owv66k5dnclejzj0ta6n.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65226a5713ce3982b0500f20",
        //                 "sectionName": "Setting Up the Development Environment",
        //                 "subSection": [
        //                     {
        //                         "_id": "65227e7513ce3982b05013cc",
        //                         "title": "Installing Node.js and npm",
        //                         "timeDuration": "6.573233",
        //                         "description": "Installing Node.js and npm is the foundational step for setting up a development environment. Node.js is a JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. npm (Node Package Manager) is a powerful tool that comes bundled with Node.js, enabling you to easily manage and install libraries and packages needed for your projects. Together, they provide a robust platform for building server-side applications and running JavaScript-based tools. ",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759412/StudyNotion/et5mzv0dyo9plqtxpaar.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65226d0613ce3982b0500f4e",
        //                 "sectionName": "Front-End Development with React",
        //                 "subSection": [
        //                     {
        //                         "_id": "65226d4c13ce3982b0500f54",
        //                         "title": "Getting Started with React",
        //                         "timeDuration": "6.573233",
        //                         "description": "Welcome to the exciting world of front-end development with React! In this section, we'll dive deep into building dynamic and interactive user interfaces using the powerful React library. You'll learn the fundamentals of component-based architecture, state management, and routing. By the end of this section, you'll be equipped with the skills to create seamless and responsive front-end experiences.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696755018/StudyNotion/bbwrs9y7gryjj2xzerob.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "65226d6513ce3982b0500f58",
        //                         "title": "State Management in React",
        //                         "timeDuration": "6.573233",
        //                         "description": "Welcome to the exciting world of front-end development with React! In this section, we'll dive deep into building dynamic and interactive user interfaces using the powerful React library. You'll learn the fundamentals of component-based architecture, state management, and routing. By the end of this section, you'll be equipped with the skills to create seamless and responsive front-end experiences.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696755043/StudyNotion/j8qkdv2hloqgqzgd0qkp.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "65226d8b13ce3982b0500f5c",
        //                         "title": "React Router for Navigation",
        //                         "timeDuration": "6.573233",
        //                         "description": "Welcome to the exciting world of front-end development with React! In this section, we'll dive deep into building dynamic and interactive user interfaces using the powerful React library. You'll learn the fundamentals of component-based architecture, state management, and routing. By the end of this section, you'll be equipped with the skills to create seamless and responsive front-end experiences.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696755082/StudyNotion/rwyeyjomozdaws4wv7pl.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65227e9513ce3982b05013d0",
        //                 "sectionName": "Back-End Development with Node.js and Express",
        //                 "subSection": [
        //                     {
        //                         "_id": "65227ed613ce3982b05013d6",
        //                         "title": "Creating a Basic Server with Node.js",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"Creating a Basic Server with Node.js\" introduces learners to the foundational aspect of back-end development. This section guides them through the process of setting up a simple HTTP server using Node.js. Participants will learn to handle HTTP requests and responses, paving the way for a deeper understanding of server-side programming. This hands-on approach lays the groundwork for building more complex server applications in the subsequent modules.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759508/StudyNotion/zd9szn4lhhbor1rpus76.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65227ee313ce3982b05013da",
        //                 "sectionName": " Database Management with MongoDB",
        //                 "subSection": [
        //                     {
        //                         "_id": "65227f1813ce3982b05013e0",
        //                         "title": "CRUD Operations in MongoDB",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"CRUD Operations in MongoDB\" delves into the fundamental actions of creating, reading, updating, and deleting data within a MongoDB database. Learners will grasp the essential techniques for managing documents, including inserting new records, querying for specific information, updating existing data, and removing documents as needed. This section equips participants with the core skills necessary for efficient data manipulation and retrieval in MongoDB, forming the basis for more complex database interactions.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759574/StudyNotion/lefko0gme17h80qlymqh.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65227f2513ce3982b05013e4",
        //                 "sectionName": " Building RESTful APIs",
        //                 "subSection": [
        //                     {
        //                         "_id": "65227f5713ce3982b05013ea",
        //                         "title": " Building RESTful APIs",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"Building RESTful APIs\" focuses on constructing a robust and scalable API architecture following the principles of REST (Representational State Transfer). This section guides learners through the process of designing endpoints, handling various HTTP methods, and ensuring secure data transmission. Participants will gain hands-on experience in creating, validating, and documenting APIs, enabling seamless communication between client and server applications. This essential skill set is foundational for developing modern, data-driven web applications and services.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759637/StudyNotion/hqvpckegjgcrirj2kcow.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "65227f6013ce3982b05013ee",
        //                 "sectionName": "Authentication and Authorization",
        //                 "subSection": [
        //                     {
        //                         "_id": "6522800a13ce3982b05013f4",
        //                         "title": "Implementing Login and Logout Functionality",
        //                         "timeDuration": "6.573233",
        //                         "description": "\r\n\"Implementing Login and Logout Functionality\" focuses on enabling users to securely authenticate and terminate their sessions within a web application. This section guides learners through the process of creating routes and controllers for user login and logout, ensuring the generation and verification of authentication tokens. Participants will gain hands-on experience in establishing secure user sessions, a critical component of any authentication system, enabling users to access their accounts and protect sensitive information.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759816/StudyNotion/j0ch2wlprfvw91mcfjbr.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "6522803713ce3982b05013f8",
        //                 "sectionName": "State Management and Routing",
        //                 "subSection": [
        //                     {
        //                         "_id": "6522809d13ce3982b05013fe",
        //                         "title": "Using Redux for Advanced State Management",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"Using Redux for Advanced State Management\" delves into employing Redux, a powerful state management library, to handle complex state logic in large-scale applications. This section guides learners through the process of setting up Redux, creating actions, reducers, and establishing a central store. ",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696759963/StudyNotion/fsjt7hda6pav1o4libc8.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652280d713ce3982b0501402",
        //                 "sectionName": "Deployment and Hosting",
        //                 "subSection": [
        //                     {
        //                         "_id": "6522811013ce3982b0501408",
        //                         "title": "Preparing Your Application for Deployment",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"Preparing Your Application for Deployment\" entails a critical phase before launching a web application. In this section, learners will delve into optimizing their codebase and assets for improved performance. This involves tasks such as minimizing file sizes, compressing images, and conducting pre-deployment checks to identify potential issues. Participants will gain valuable insights into streamlining their application, ensuring it runs efficiently on live servers, and providing users with a seamless experience.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696760079/StudyNotion/k1d9s0phgx2zuxcahljf.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "6522817813ce3982b050140c",
        //                 "sectionName": "Mega Project and Portfolio",
        //                 "subSection": [
        //                     {
        //                         "_id": "652281ce13ce3982b0501416",
        //                         "title": "Project Ideation and Planning",
        //                         "timeDuration": "6.573233",
        //                         "description": "\"Project Ideation and Planning\" serves as the foundational step in the project development process. In this section, learners will explore techniques for generating innovative project ideas aligned with their course learnings and personal interests. They will delve into defining the scope, features, and functionalities of their chosen projects. ",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1696760268/StudyNotion/si20mzzz7zddcwl4oxs8.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "653bdf47991121dddd97c094",
        //             "653c9d05d74b301c0df6b892",
        //             "653de2556abd8956a010d1cb",
        //             "6579f6a74df967027c97df51",
        //             "6633fb8e5f82af56fb89c37c",
        //             "6654e431138fb19c1df235bf"
        //         ],
        //         "price": 4999,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1696753842/StudyNotion/tkdxzk4f3nrejghxibzb.png",
        //         "category": "6506c9dff191d7ffdb4a3fe2",
        //         "tag": [
        //             "FullStackDevelopment",
        //             "MERNStack",
        //             "ReactJS",
        //             "FrontEndDevelopment",
        //             "BackEndDevelopment",
        //             "DatabaseManagement",
        //             "Routing",
        //             "HTML",
        //             "CSS",
        //             "Javascript",
        //             "NodeJS",
        //             "RESTfulAPIs"
        //         ],
        //         "studentsEnrolled": [
        //             "650d6ae2914831142c702e4c",
        //             "6581d79a1be37847676256d4",
        //             "65893d31167a47534620f77d",
        //             "65db1054da548d9fff6ca9e9",
        //             "65e8963c4f94db21717e06e9",
        //             "65f2ffaf3c052eb6d5b09b4f",
        //             "6613d0c007bc8327f41990f9",
        //             "660bbf1679e18501a2e1764a",
        //             "661fbcb6fd7fed839853c048",
        //             "661d6508d9a13fa9815c1e23",
        //             "662b76ecdb4a2ecdd93c320b",
        //             "6633292f4e54dd77aa38256b",
        //             "6633f68c5f82af56fb89c2cf",
        //             "663a789c1b0dc8961c40b618",
        //             "66354f00a91738495a389f85",
        //             "663b4b760be6cf0117be25e6",
        //             "664cd6ab2028bcf480176229",
        //             "6654dfba138fb19c1df233da"
        //         ],
        //         "instructions": [
        //             "Access to a Computer",
        //             "Text Editor/IDE",
        //             "Node.js and npm"
        //         ],
        //         "status": "Published",
        //         "createdAt": "2023-10-08T08:30:42.987Z",
        //         "__v": 6,
        //         "updatedAt": "2023-10-14T15:18:30.818Z",
        //         "totalDuration": "1m 12s",
        //         "progressPercentage": 33.33,
        //         "courseProgress": 4,
        //         "courseStatus": "Pending"
        //     },
        //     {
        //         "_id": "65153490518bb5ec7615b247",
        //         "courseName": "Android Development",
        //         "courseDescription": "Master the art of Android app development! Learn how to build engaging, user-friendly applications for the world's most popular mobile platform. Dive into Java and Kotlin programming, UI/UX design, API integration, and more. Whether you're a beginner or seasoned developer, this course empowers you to create innovative Android apps from scratch.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": " In-Demand Skillset: \r\n Career Growth\r\nPortfolio Building\r\nStay Current with Technology\r\n Community and Support\r\n Remote Work Opportunities\r\nJob Security",
        //         "courseContent": [
        //             {
        //                 "_id": "651534c3518bb5ec7615b24b",
        //                 "sectionName": " Introduction to Android Development",
        //                 "subSection": [
        //                     {
        //                         "_id": "651535bf518bb5ec7615b278",
        //                         "title": "Introduction to Variables and Data Types",
        //                         "timeDuration": "7.540867",
        //                         "description": "n this lecture, we will learn about variables, their types, and how to declare and initialize them in Java. Understanding data types is crucial for effective programming as it helps us manage and manipulate information in our programs. We'll also cover best practices for variable naming conventions.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695888831/StudyNotion/s2keohfzrnhsnit2h2kq.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "651534d0518bb5ec7615b250",
        //                 "sectionName": "Java Programming for Android",
        //                 "subSection": [
        //                     {
        //                         "_id": "651536dd96e4a059037cb618",
        //                         "title": "Introduction to Java Programming",
        //                         "timeDuration": "7.540867",
        //                         "description": "This lecture provides an overview of Java programming language, its syntax, and basic concepts. We'll cover topics such as data types, variables, operators, control structures, and functions. Understanding these fundamentals is crucial for building robust Android applications.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695889117/StudyNotion/lbtd55azpwt6uyj1eput.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "651534d8518bb5ec7615b255",
        //                 "sectionName": "Kotlin Programming for Android",
        //                 "subSection": [
        //                     {
        //                         "_id": "651537a896e4a059037cb61c",
        //                         "title": "Getting Started with Kotlin",
        //                         "timeDuration": "7.25725",
        //                         "description": "In this lecture, we'll introduce you to the Kotlin programming language, which is now the preferred language for Android development. We'll cover the basics of syntax, data types, variables, and control structures in Kotlin. By the end of this lecture, you'll have a solid foundation in Kotlin programming.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695889320/StudyNotion/lkfvjmhcjzjb43opihw8.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "651534dd518bb5ec7615b25a",
        //                 "sectionName": "User Interface (UI) Design",
        //                 "subSection": [
        //                     {
        //                         "_id": "6515384296e4a059037cb628",
        //                         "title": "Principles of UI Design",
        //                         "timeDuration": "12",
        //                         "description": "his lecture delves into the fundamental principles of User Interface (UI) design. We'll cover topics such as layout, typography, color theory, and user experience (UX) considerations. Understanding these principles is essential for creating intuitive and visually appealing interfaces for Android applications.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695889474/StudyNotion/bnukjffgtc4vedarcj1g.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "651534eb518bb5ec7615b264",
        //                 "sectionName": "Intents and Services",
        //                 "subSection": [
        //                     {
        //                         "_id": "6515387f96e4a059037cb62c",
        //                         "title": "Working with Android Services",
        //                         "timeDuration": "9.366667",
        //                         "description": "This lecture focuses on Android services, which allow you to perform background tasks independently of the UI. We'll cover concepts like service lifecycle, types of services (started vs. bound), and how to create and manage services for tasks like music playback, network operations, and more.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695889535/StudyNotion/vwlqvifntsbnpzunima9.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "651534f4518bb5ec7615b269",
        //                 "sectionName": "Networking and API Integration",
        //                 "subSection": [
        //                     {
        //                         "_id": "651538d796e4a059037cb630",
        //                         "title": "Making HTTP Requests in Android",
        //                         "timeDuration": "6.573233",
        //                         "description": "In this lecture, we'll dive into the process of making HTTP requests from Android applications. We'll cover topics like using the HttpURLConnection class, making GET and POST requests, handling response codes, and parsing JSON data. Understanding these concepts is essential for integrating external APIs into your Android apps.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695889623/StudyNotion/tuekhw0qiskvs6kymlvv.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "6515350d518bb5ec7615b273",
        //                 "sectionName": "Advanced Topics and Libraries",
        //                 "subSection": [
        //                     {
        //                         "_id": "65153b1d1139e1bba28cc090",
        //                         "title": "Firebase Integration for Android Apps",
        //                         "timeDuration": "6.573233",
        //                         "description": "This lecture explores Firebase, a comprehensive platform for building mobile and web applications. We'll cover topics like Firebase Authentication, Realtime Database, Cloud Firestore, Cloud Messaging, and Firebase Hosting. Firebase provides powerful tools to enhance the functionality and user experience of your Android applications.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1695890205/StudyNotion/kspsdfvifwbfza4ffywc.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "653be3bb46aa4f3f122e2ecf",
        //             "653cacbf74ffef05ea2af104",
        //             "653de83e6abd8956a010d299"
        //         ],
        //         "price": 4999,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1696772927/StudyNotion/z4er5zb4whyqltpppooc.png",
        //         "category": "6506ca558f6b93cf4729fbb5",
        //         "tag": [
        //             "Java Programming",
        //             "Android Studio",
        //             "Firebase",
        //             "Material Design",
        //             "Android SDK",
        //             "Mobile App Testing"
        //         ],
        //         "studentsEnrolled": [
        //             "650d6ae2914831142c702e4c",
        //             "662e39c925b68661368e8baa",
        //             "662b76ecdb4a2ecdd93c320b"
        //         ],
        //         "instructions": [
        //             "Basic Programming Knowledge",
        //             "Operating System",
        //             "Android Studio",
        //             "Internet Connection",
        //             "Passion for Learning"
        //         ],
        //         "status": "Published",
        //         "__v": 2,
        //         "createdAt": "2023-09-24T09:54:31.235Z",
        //         "updatedAt": "2023-10-22T08:20:13.496Z",
        //         "totalDuration": "54s",
        //         "progressPercentage": 0,
        //         "courseProgress": 4,
        //         "courseStatus": "Pending"
        //     },
        //     {
        //         "_id": "652a6f14f0823ac900285e52",
        //         "courseName": "Docker In 3 Hours",
        //         "courseDescription": "This Course is an intensive, fast-paced course designed to equip you with the essential knowledge and practical skills needed to effectively use Docker for containerizing and deploying applications.\r\n Whether you're a developer, system administrator, or IT professional, this course will empower you to leverage Docker for seamless application deployment and scalability.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": "Rapid Learning Curve\r\nPractical Hands-On Experience\r\nEfficient Containerization Techniques\r\n Integration with DevOps Practices\r\n Preparation for Advanced Docker Topics\r\n Career Advancement",
        //         "courseContent": [
        //             {
        //                 "_id": "652a6f38f0823ac900285e56",
        //                 "sectionName": "Introduction to Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6f9df0823ac900285e7e",
        //                         "title": "Understanding Containerization and Docker Basics",
        //                         "timeDuration": "6.573233",
        //                         "description": "Understanding Containerization and Docker Basics",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279901/StudyNotion/a3m1v86l38qef8xonxxh.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f42f0823ac900285e5b",
        //                 "sectionName": "Creating and Running Containers",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fb7f0823ac900285e82",
        //                         "title": "Setting Up Docker on Windows, macOS, and Linux",
        //                         "timeDuration": "6.573233",
        //                         "description": "Setting Up Docker on Windows, macOS, and Linux",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279927/StudyNotion/fbdqgoae3rreax7lrdog.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f47f0823ac900285e60",
        //                 "sectionName": "Docker Compose",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fd2f0823ac900285e86",
        //                         "title": " Orchestrating Multi-Container Applications with Docker Compose",
        //                         "timeDuration": "6.573233",
        //                         "description": "\r\nOrchestrating Multi-Container Applications with Docker Compose",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279954/StudyNotion/jxtirziid9mgxjdddvrd.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f4df0823ac900285e65",
        //                 "sectionName": "Data Management with Docker Volumes",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fe6f0823ac900285e8a",
        //                         "title": "Persistent Data and Docker: Volumes Explained",
        //                         "timeDuration": "6.573233",
        //                         "description": "Persistent Data and Docker: Volumes Explained",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279974/StudyNotion/kkht4dcszy6z61bk9wdo.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f56f0823ac900285e6a",
        //                 "sectionName": "Container Orchestration (Optional)",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6ff6f0823ac900285e8e",
        //                         "title": "Scaling and Orchestrating Containers with Kubernetes",
        //                         "timeDuration": "6.573233",
        //                         "description": "Scaling and Orchestrating Containers with Kubernetes",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279991/StudyNotion/zq73ygreaf0f0r3zf8qj.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f5af0823ac900285e6f",
        //                 "sectionName": "Deploying Applications with Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a7007f0823ac900285e92",
        //                         "title": "Deploying Dockerized Applications to Production",
        //                         "timeDuration": "6.573233",
        //                         "description": "Deploying Dockerized Applications to Production",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280007/StudyNotion/oxruq2uqk4igwr6uhyb8.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f5ef0823ac900285e74",
        //                 "sectionName": "Best Practices and Tips",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a701af0823ac900285e96",
        //                         "title": "Docker Best Practices: Optimization and Efficiency",
        //                         "timeDuration": "6.573233",
        //                         "description": "Docker Best Practices: Optimization and Efficiency",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280026/StudyNotion/ylvs1bgfjvp1bfoqkm7h.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f65f0823ac900285e79",
        //                 "sectionName": "Troubleshooting Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a7026f0823ac900285e9a",
        //                         "title": "Debugging and Resolving Common Docker Issues",
        //                         "timeDuration": "6.573233",
        //                         "description": "Debugging and Resolving Common Docker Issues",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280038/StudyNotion/shbufr96ynkuvpqtkyqi.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "653ca51dd74b301c0df6bc5d",
        //             "6579f6ca4df967027c97df67",
        //             "664f179af7cdf4323b43ad64"
        //         ],
        //         "price": 699,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1697279764/StudyNotion/rphgnysoklsxosigjz71.png",
        //         "category": "652a6ddaa129e11ab276bd45",
        //         "tag": [
        //             "Containerization",
        //             "Cloud Computing",
        //             "DevOps Tools",
        //             "Microservices",
        //             "IT Operations",
        //             "Deployment",
        //             "Virtualization"
        //         ],
        //         "studentsEnrolled": [
        //             "662e39c925b68661368e8baa",
        //             "664e582db12fae7c8d77a35c",
        //             "66522bf41b44dbd8c27fffa1",
        //             "6654dfba138fb19c1df233da",
        //             "662b76ecdb4a2ecdd93c320b"
        //         ],
        //         "instructions": [
        //             "Basic Computer Literacy",
        //             "Internet Access",
        //             "Operating System",
        //             "Text Editor or IDE",
        //             "A Desire to Learn"
        //         ],
        //         "status": "Published",
        //         "createdAt": "2023-10-14T10:36:03.997Z",
        //         "__v": 5,
        //         "updatedAt": "2023-10-15T08:04:53.007Z",
        //         "totalDuration": "48s",
        //         "progressPercentage": 0,
        //         "courseProgress": 4,
        //         "courseStatus": "Completed"
        //     },
        //     {
        //         "_id": "653cf307cc8880682f939b23",
        //         "courseName": "Database Engineer",
        //         "courseDescription": "This comprehensive course is designed to equip you with the skills and knowledge needed to excel as a Database Engineer. You will learn the fundamentals of database design, management, and optimization. Dive into SQL, NoSQL, and explore advanced topics such as data warehousing and scalability. Get hands-on experience with industry-standard tools and platforms. Whether you're a beginner or an experienced developer, this course will empower you to build robust and efficient database solutions.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": "In-Demand Skillset\r\nCareer Advancement\r\nImproved Efficiency\r\nCompetitive Edge\r\nProblem-Solving Skills\r\nCertification and Recognition",
        //         "courseContent": [
        //             {
        //                 "_id": "653cf387cc8880682f939b27",
        //                 "sectionName": "Introduction to Database Management",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf3cacc8880682f939b2c",
        //                         "title": "Fundamentals of Relational Databases",
        //                         "timeDuration": "6.573233",
        //                         "description": "This lecture covers the basic principles and concepts of relational databases, including tables, relationships, and SQL queries.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493387/StudyNotion/cadq3zvwjt4eq7waems0.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "653cf4edcc8880682f939b44",
        //                         "title": "Indexing and Performance Optimization",
        //                         "timeDuration": "6.573233",
        //                         "description": "Learn how to optimize database performance by creating and using indexes effectively.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493678/StudyNotion/dpkrjrq92pcyoijpjry1.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "653cf499cc8880682f939b30",
        //                 "sectionName": "Database Design and Modeling",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf4adcc8880682f939b36",
        //                         "title": "Entity-Relationship Diagrams (ERDs)",
        //                         "timeDuration": "6.573233",
        //                         "description": "Learn how to create ERDs to visualize the structure of your database and define relationships between entities.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493615/StudyNotion/hkwix1hvuvbzxtcvyqej.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "653cf51ecc8880682f939b48",
        //                         "title": "Data Security and Backup Strategies",
        //                         "timeDuration": "6.573233",
        //                         "description": "Understand important data security concepts and learn how to implement measures to protect your database.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493727/StudyNotion/au2ne4dov6zbmc9srp5w.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "653cf4b3cc8880682f939b3a",
        //                 "sectionName": " SQL Queries and Data Manipulation",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf4cacc8880682f939b40",
        //                         "title": "SELECT Statements and Data Filtering",
        //                         "timeDuration": "6.573233",
        //                         "description": "JOIN Operations and Subqueries\r\nDescription: Explore advanced SQL techniques like JOIN operations and subqueries to retrieve complex data from multiple tables.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493643/StudyNotion/x3keqwliogxqi8jfw4ho.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "662e3bbf25b68661368e8c38",
        //             "663b8de15df8087dc3b59a4d",
        //             "664cef73f0627a43d3587b83"
        //         ],
        //         "price": 4999,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1698493192/StudyNotion/lzsuimslcojlkelkqfpz.png",
        //         "category": "653cf180e931dd1acafda613",
        //         "tag": [
        //             "\"Database Management",
        //             "SQL",
        //             "NoSQL",
        //             "Data Modeling",
        //             "MongoDB",
        //             "PostgreSQL",
        //             "MySQL",
        //             "Data Migration"
        //         ],
        //         "studentsEnrolled": [
        //             "650d6ae2914831142c702e4c",
        //             "65db1054da548d9fff6ca9e9",
        //             "6606c7aa67b5881570be6945",
        //             "662e39c925b68661368e8baa",
        //             "66354f00a91738495a389f85",
        //             "664cd6ab2028bcf480176229",
        //             "662b76ecdb4a2ecdd93c320b"
        //         ],
        //         "instructions": [
        //             "Basic Computer Skills",
        //             "Understanding of Data Concepts",
        //             "Internet Connectivity",
        //             "Commitment to Learning",
        //             "Basic Programming Knowledge"
        //         ],
        //         "status": "Published",
        //         "createdAt": "2023-10-28T11:39:51.161Z",
        //         "__v": 3,
        //         "updatedAt": "2023-11-12T02:42:10.586Z",
        //         "totalDuration": "30s",
        //         "progressPercentage": 0,
        //         "courseProgress": 4,
        //         "courseStatus": "Completed"
        //     },
        //     {
        //         "_id": "652a6f14f0823ac900285e52",
        //         "courseName": "Docker In 3 Hours",
        //         "courseDescription": "This Course is an intensive, fast-paced course designed to equip you with the essential knowledge and practical skills needed to effectively use Docker for containerizing and deploying applications.\r\n Whether you're a developer, system administrator, or IT professional, this course will empower you to leverage Docker for seamless application deployment and scalability.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": "Rapid Learning Curve\r\nPractical Hands-On Experience\r\nEfficient Containerization Techniques\r\n Integration with DevOps Practices\r\n Preparation for Advanced Docker Topics\r\n Career Advancement",
        //         "courseContent": [
        //             {
        //                 "_id": "652a6f38f0823ac900285e56",
        //                 "sectionName": "Introduction to Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6f9df0823ac900285e7e",
        //                         "title": "Understanding Containerization and Docker Basics",
        //                         "timeDuration": "6.573233",
        //                         "description": "Understanding Containerization and Docker Basics",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279901/StudyNotion/a3m1v86l38qef8xonxxh.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f42f0823ac900285e5b",
        //                 "sectionName": "Creating and Running Containers",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fb7f0823ac900285e82",
        //                         "title": "Setting Up Docker on Windows, macOS, and Linux",
        //                         "timeDuration": "6.573233",
        //                         "description": "Setting Up Docker on Windows, macOS, and Linux",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279927/StudyNotion/fbdqgoae3rreax7lrdog.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f47f0823ac900285e60",
        //                 "sectionName": "Docker Compose",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fd2f0823ac900285e86",
        //                         "title": " Orchestrating Multi-Container Applications with Docker Compose",
        //                         "timeDuration": "6.573233",
        //                         "description": "\r\nOrchestrating Multi-Container Applications with Docker Compose",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279954/StudyNotion/jxtirziid9mgxjdddvrd.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f4df0823ac900285e65",
        //                 "sectionName": "Data Management with Docker Volumes",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6fe6f0823ac900285e8a",
        //                         "title": "Persistent Data and Docker: Volumes Explained",
        //                         "timeDuration": "6.573233",
        //                         "description": "Persistent Data and Docker: Volumes Explained",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279974/StudyNotion/kkht4dcszy6z61bk9wdo.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f56f0823ac900285e6a",
        //                 "sectionName": "Container Orchestration (Optional)",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a6ff6f0823ac900285e8e",
        //                         "title": "Scaling and Orchestrating Containers with Kubernetes",
        //                         "timeDuration": "6.573233",
        //                         "description": "Scaling and Orchestrating Containers with Kubernetes",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697279991/StudyNotion/zq73ygreaf0f0r3zf8qj.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f5af0823ac900285e6f",
        //                 "sectionName": "Deploying Applications with Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a7007f0823ac900285e92",
        //                         "title": "Deploying Dockerized Applications to Production",
        //                         "timeDuration": "6.573233",
        //                         "description": "Deploying Dockerized Applications to Production",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280007/StudyNotion/oxruq2uqk4igwr6uhyb8.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f5ef0823ac900285e74",
        //                 "sectionName": "Best Practices and Tips",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a701af0823ac900285e96",
        //                         "title": "Docker Best Practices: Optimization and Efficiency",
        //                         "timeDuration": "6.573233",
        //                         "description": "Docker Best Practices: Optimization and Efficiency",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280026/StudyNotion/ylvs1bgfjvp1bfoqkm7h.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "652a6f65f0823ac900285e79",
        //                 "sectionName": "Troubleshooting Docker",
        //                 "subSection": [
        //                     {
        //                         "_id": "652a7026f0823ac900285e9a",
        //                         "title": "Debugging and Resolving Common Docker Issues",
        //                         "timeDuration": "6.573233",
        //                         "description": "Debugging and Resolving Common Docker Issues",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1697280038/StudyNotion/shbufr96ynkuvpqtkyqi.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "653ca51dd74b301c0df6bc5d",
        //             "6579f6ca4df967027c97df67",
        //             "664f179af7cdf4323b43ad64"
        //         ],
        //         "price": 699,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1697279764/StudyNotion/rphgnysoklsxosigjz71.png",
        //         "category": "652a6ddaa129e11ab276bd45",
        //         "tag": [
        //             "Containerization",
        //             "Cloud Computing",
        //             "DevOps Tools",
        //             "Microservices",
        //             "IT Operations",
        //             "Deployment",
        //             "Virtualization"
        //         ],
        //         "studentsEnrolled": [
        //             "662e39c925b68661368e8baa",
        //             "664e582db12fae7c8d77a35c",
        //             "66522bf41b44dbd8c27fffa1",
        //             "6654dfba138fb19c1df233da",
        //             "662b76ecdb4a2ecdd93c320b"
        //         ],
        //         "instructions": [
        //             "Basic Computer Literacy",
        //             "Internet Access",
        //             "Operating System",
        //             "Text Editor or IDE",
        //             "A Desire to Learn"
        //         ],
        //         "status": "Published",
        //         "createdAt": "2023-10-14T10:36:03.997Z",
        //         "__v": 5,
        //         "updatedAt": "2023-10-15T08:04:53.007Z",
        //         "totalDuration": "48s",
        //         "progressPercentage": 0,
        //         "courseProgress": 4,
        //         "courseStatus": "Pending"
        //     },
        //     {
        //         "_id": "653cf307cc8880682f939b23",
        //         "courseName": "Database Engineer",
        //         "courseDescription": "This comprehensive course is designed to equip you with the skills and knowledge needed to excel as a Database Engineer. You will learn the fundamentals of database design, management, and optimization. Dive into SQL, NoSQL, and explore advanced topics such as data warehousing and scalability. Get hands-on experience with industry-standard tools and platforms. Whether you're a beginner or an experienced developer, this course will empower you to build robust and efficient database solutions.",
        //         "instructor": "650fe3758d038bfe270c298f",
        //         "whatYouWillLearn": "In-Demand Skillset\r\nCareer Advancement\r\nImproved Efficiency\r\nCompetitive Edge\r\nProblem-Solving Skills\r\nCertification and Recognition",
        //         "courseContent": [
        //             {
        //                 "_id": "653cf387cc8880682f939b27",
        //                 "sectionName": "Introduction to Database Management",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf3cacc8880682f939b2c",
        //                         "title": "Fundamentals of Relational Databases",
        //                         "timeDuration": "6.573233",
        //                         "description": "This lecture covers the basic principles and concepts of relational databases, including tables, relationships, and SQL queries.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493387/StudyNotion/cadq3zvwjt4eq7waems0.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "653cf4edcc8880682f939b44",
        //                         "title": "Indexing and Performance Optimization",
        //                         "timeDuration": "6.573233",
        //                         "description": "Learn how to optimize database performance by creating and using indexes effectively.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493678/StudyNotion/dpkrjrq92pcyoijpjry1.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "653cf499cc8880682f939b30",
        //                 "sectionName": "Database Design and Modeling",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf4adcc8880682f939b36",
        //                         "title": "Entity-Relationship Diagrams (ERDs)",
        //                         "timeDuration": "6.573233",
        //                         "description": "Learn how to create ERDs to visualize the structure of your database and define relationships between entities.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493615/StudyNotion/hkwix1hvuvbzxtcvyqej.mp4",
        //                         "__v": 0
        //                     },
        //                     {
        //                         "_id": "653cf51ecc8880682f939b48",
        //                         "title": "Data Security and Backup Strategies",
        //                         "timeDuration": "6.573233",
        //                         "description": "Understand important data security concepts and learn how to implement measures to protect your database.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493727/StudyNotion/au2ne4dov6zbmc9srp5w.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             },
        //             {
        //                 "_id": "653cf4b3cc8880682f939b3a",
        //                 "sectionName": " SQL Queries and Data Manipulation",
        //                 "subSection": [
        //                     {
        //                         "_id": "653cf4cacc8880682f939b40",
        //                         "title": "SELECT Statements and Data Filtering",
        //                         "timeDuration": "6.573233",
        //                         "description": "JOIN Operations and Subqueries\r\nDescription: Explore advanced SQL techniques like JOIN operations and subqueries to retrieve complex data from multiple tables.",
        //                         "videoUrl": "https://res.cloudinary.com/dfykppt3d/video/upload/v1698493643/StudyNotion/x3keqwliogxqi8jfw4ho.mp4",
        //                         "__v": 0
        //                     }
        //                 ],
        //                 "__v": 0
        //             }
        //         ],
        //         "ratingAndReviews": [
        //             "662e3bbf25b68661368e8c38",
        //             "663b8de15df8087dc3b59a4d",
        //             "664cef73f0627a43d3587b83"
        //         ],
        //         "price": 4999,
        //         "thumbnail": "https://res.cloudinary.com/dfykppt3d/image/upload/v1698493192/StudyNotion/lzsuimslcojlkelkqfpz.png",
        //         "category": "653cf180e931dd1acafda613",
        //         "tag": [
        //             "\"Database Management",
        //             "SQL",
        //             "NoSQL",
        //             "Data Modeling",
        //             "MongoDB",
        //             "PostgreSQL",
        //             "MySQL",
        //             "Data Migration"
        //         ],
        //         "studentsEnrolled": [
        //             "650d6ae2914831142c702e4c",
        //             "65db1054da548d9fff6ca9e9",
        //             "6606c7aa67b5881570be6945",
        //             "662e39c925b68661368e8baa",
        //             "66354f00a91738495a389f85",
        //             "664cd6ab2028bcf480176229",
        //             "662b76ecdb4a2ecdd93c320b"
        //         ],
        //         "instructions": [
        //             "Basic Computer Skills",
        //             "Understanding of Data Concepts",
        //             "Internet Connectivity",
        //             "Commitment to Learning",
        //             "Basic Programming Knowledge"
        //         ],
        //         "status": "Published",
        //         "createdAt": "2023-10-28T11:39:51.161Z",
        //         "__v": 3,
        //         "updatedAt": "2023-11-12T02:42:10.586Z",
        //         "totalDuration": "30s",
        //         "progressPercentage": 0,
        //         "courseProgress": 4,
        //         "courseStatus": "Completed"
        //     }
        // ]
        setEnrolledCourses(res)
    }

    useEffect(() => {
        getFunction()
    }, [])

    // Filter function
    const filterCourses = (courses, filter) => {
        if (filter === COURSE_COMPLETION_STATUS.ALL) {
            return courses;
        }
        return courses.filter(course => course.courseStatus === filter);
    };

    // Apply filter to enrolledCourses
    const filteredCourses = enrolledCourses ? filterCourses(enrolledCourses, filter) : [];

    const tabData = [
        {
            id: 1,
            tabName: "All",
            type: COURSE_COMPLETION_STATUS.ALL,
        },
        {
            id: 2,
            tabName: "Pending",
            type: COURSE_COMPLETION_STATUS.PENDING,
        },
        {
            id: 3,
            tabName: "Completed",
            type: COURSE_COMPLETION_STATUS.COMPLETED,
        },
    ]

    return (
        <>
            <div className='transition-all duration-200'>
                <h1 className="text-3xl text-richblack-50">
                    Enrolled Courses
                </h1>

                {/* CHECK IF ANY COURSES AVAILABLE */}
                {!enrolledCourses
                    ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>)

                    // ONCE LOADED CHECK IF THERE IS ANY COURSE AVAILABLE?
                    : (!enrolledCourses.length
                        // NO ENROLLED COURSES
                        ? <p className="grid h-[15vh] text-xl w-full place-content-center text-richblack-5">
                            You haven't enrolled in any courses yet.
                        </p>

                        // ENROLLED COURSES
                        : (
                            <div className="my-8 text-richblack-5">
                                {/* TAB SECTION TO FILTER COURSE BASED ON PROGRESS */}
                                <Tab tabData={tabData} field={filter} setField={setFilter} />

                                {/* COURSE CARDS */}
                                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-0 sm:px-20 px-10 gap-x-4 gap-y-7 '>
                                    {
                                        filteredCourses.map((course, index) => {
                                            return (
                                                <EnrolledCourseTable course={course} index={index} key={index} />
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        )
                    )

                }
            </div>
        </>
    )
}

export default EnrolledCourses