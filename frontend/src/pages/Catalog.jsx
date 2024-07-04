import React, { useEffect, useMemo, useState } from 'react'
import Footer from '../components/common/Footer'
import { Link, useParams } from 'react-router-dom'
import { fetchCourseCategories, getCategoriesPageData } from '../services/backendCallFunction/categoryAPI';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/CourseCard';

function Catalog() {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [active, setActive] = useState(true);


    // ! Test Data

    // const categoryId = "661f6713ef67297ca764b465"
    // const catalogPageData = {
    //     "selectedCategory": {
    //         _id: "661f6713ef67297ca764b465",
    //         name: "WEB DEVELOPMENT",
    //         description: "Learn the foundations of web development, including HTML, CSS, and JavaScript. Dive into front-end and back-end development, frameworks, and responsive design.",
    //         courses: [
    //             {
    //                 "_id": "6491cc1343b57f557be05857",
    //                 "courseName": "Android App Developement",
    //                 "courseDescription": "Learn how to build Android applications using Java or Kotlin. Understand the Android development ecosystem, UI design, data storage, and integration with device features.",
    //                 "instructor": {
    //                     "_id": "649e65590c56104d91096aed",
    //                     "firstName": "Himanshu",
    //                     "lastName": "Sangwan",
    //                     "email": "kumarhimanshusangwan@gmail.com",
    //                     "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "649e65590c56104d91096aeb",
    //                     "courses": [
    //                         "6491cc1343b57f557be05857",
    //                         "649d39d3d7bc194401bb1e8a",
    //                         "64903a50d83df5353bcf1897"
    //                     ],
    //                     "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                     "courseProgress": [],
    //                     "createdAt": "2023-06-30T05:17:13.239Z",
    //                     "updatedAt": "2023-08-08T05:22:23.241Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Mobile Game Development,\r\nAndroid App Development,\r\nJava and Kotlin",
    //                 "courseContent": [
    //                     "6491cc1f43b57f557be0585c",
    //                     "6491cc2743b57f557be05861",
    //                     "64a67a8f89ce71ba3f2e645e"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "649e9fe2f6b2ffa510e02be5",
    //                         "user": "649e678f0c56104d91096b86",
    //                         "rating": 4,
    //                         "review": "I recently completed the Full-Stack Web Development program, and it was a game-changer for my career.",
    //                         "course": "6491cc1343b57f557be05857",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "64da2a4901922332b890fecc",
    //                         "user": "64da29bd01922332b890fe94",
    //                         "rating": 2,
    //                         "review": "m",
    //                         "course": "6491cc1343b57f557be05857",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "657904568f28d97518c56786",
    //                         "user": "657902eda5062c4545ca6baa",
    //                         "rating": 5,
    //                         "review": "k",
    //                         "course": "6491cc1343b57f557be05857",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "660e5cb435bdd12d5ae51f19",
    //                         "user": "65caf59c907eb2b8d5cc2d96",
    //                         "rating": 4,
    //                         "review": "good",
    //                         "course": "6491cc1343b57f557be05857",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 1199,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631239/images/maxresdefault_2_yii7cf.jpg",
    //                 "tag": [
    //                     "[\"hh\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649e678f0c56104d91096b86",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "64b8097ec6d9ec5ee55e1af8",
    //                     "64da29bd01922332b890fe94",
    //                     "64dc75cea05dc6f4844b50e5",
    //                     "64ddf3430b80c3561c3a0a61",
    //                     "64e34489d4d32b3a4bf2f46f",
    //                     "6501777d6c7e5cc3736e71c9",
    //                     "650d9e3bf4696005bb29aaa3",
    //                     "650ef4672258d6a5c43e7c4b",
    //                     "651d2c8de96d907b03782aad",
    //                     "651fc967db6acfcc92e78c9d",
    //                     "654220ae4687b5c69ac9aff9",
    //                     "654b77d2be33b0c2067d3dd3",
    //                     "6500a9162bba640c38204e81",
    //                     "65720a6651ed133073d1791d",
    //                     "657902eda5062c4545ca6baa",
    //                     "65896f98cf412d2b1a9bc931",
    //                     "65b74d0ce0b25fef66d24f8e",
    //                     "65ba785a7c3a1d9594f6d66a",
    //                     "65c9493cde5043eaa9068f89",
    //                     "65cf6a78e512e8ff37d3ae2c",
    //                     "65e310f7ab4c0a9cc5ab7f5a",
    //                     "6605b1b454570d396d3d0014",
    //                     "65caf59c907eb2b8d5cc2d96",
    //                     "66103d5b15d3ab68b3731d8f",
    //                     "6618b8d415d3ab68b37340d8",
    //                     "6620e18a15d3ab68b3735e59",
    //                     "65c5beede7565596181b222b",
    //                     "6635376915d3ab68b373b895",
    //                     "663b656a15d3ab68b373d605",
    //                     "663ce70e15d3ab68b373db1d",
    //                     "6644a20d15d3ab68b373f680",
    //                     "664c823515d3ab68b3741874",
    //                     "664f6bd215d3ab68b3742ae0",
    //                     "6663fa3e15d3ab68b374758d"
    //                 ],
    //                 "instructions": [
    //                     "[\"kk\"]"
    //                 ],
    //                 "status": "Published",
    //                 "__v": 0,
    //                 "updatedAt": "2024-06-08T06:30:41.493Z"
    //             },
    //             {
    //                 "_id": "64903a50d83df5353bcf1897",
    //                 "courseName": "Java",
    //                 "courseDescription": "The course will cover topics like exception handling, input/output operations, file handling, and basic GUI (Graphical User Interface) development using Java Swing. You will also delve into topics such as collections, generics, and basic multithreading concepts, which are essential for developing efficient and scalable applications.",
    //                 "instructor": {
    //                     "_id": "649e65590c56104d91096aed",
    //                     "firstName": "Himanshu",
    //                     "lastName": "Sangwan",
    //                     "email": "kumarhimanshusangwan@gmail.com",
    //                     "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "649e65590c56104d91096aeb",
    //                     "courses": [
    //                         "6491cc1343b57f557be05857",
    //                         "649d39d3d7bc194401bb1e8a",
    //                         "64903a50d83df5353bcf1897"
    //                     ],
    //                     "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                     "courseProgress": [],
    //                     "createdAt": "2023-06-30T05:17:13.239Z",
    //                     "updatedAt": "2023-08-08T05:22:23.241Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Foundation in Java Programming,\r\nReal-World Application Development,\r\nVersatility and Market Demand",
    //                 "courseContent": [
    //                     "64903a57d83df5353bcf189c",
    //                     "6496c31378aab93db9876816",
    //                     "6522bdef270f8be8352fc027",
    //                     "6560eaf243bb76fadae2624f",
    //                     "656125ed42652fb1e477a85b",
    //                     "65c94ae6f4fc4e173c3e6479"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "649e991bf6b2ffa510e02a76",
    //                         "user": "649e678f0c56104d91096b86",
    //                         "rating": 5,
    //                         "review": "Greate Course.The Web Development Bootcamp exceeded my expectations.",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "64f0d4d58a614ed1d4cc2381",
    //                         "user": "64f0d268362cd4d21148b6b4",
    //                         "rating": 3,
    //                         "review": "best ",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "6552ddc47afcd3c95fe3fd54",
    //                         "user": "6541261e329cc76ed0055dc7",
    //                         "rating": 5,
    //                         "review": "Nice",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "65ddfd32dd46edc63dea197a",
    //                         "user": "65d9698082835197735d2d10",
    //                         "rating": 1,
    //                         "review": "Bad course",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "66376d0615d3ab68b373c212",
    //                         "user": "66376c2e15d3ab68b373c1da",
    //                         "rating": 5,
    //                         "review": "nice course",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "664501ab15d3ab68b373f9ab",
    //                         "user": "64f5e170e0d3ebb86b49aaf5",
    //                         "rating": 5,
    //                         "review": "nice",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "666079d515d3ab68b37462f3",
    //                         "user": "664cfda415d3ab68b3741ebe",
    //                         "rating": 4,
    //                         "review": "good course",
    //                         "course": "64903a50d83df5353bcf1897",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 1199,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688630790/images/computers-others-wallpaper-preview_suhi9b.jpg",
    //                 "tag": [
    //                     "[\"java\",\"language\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649e678f0c56104d91096b86",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "64d95ad8e4bbbd24c1606515",
    //                     "64f0d268362cd4d21148b6b4",
    //                     "64f8b8160f8820c5b04df88e",
    //                     "6544a4dc8f1cae6d587d6594",
    //                     "6541261e329cc76ed0055dc7",
    //                     "654b77d2be33b0c2067d3dd3",
    //                     "6500a9162bba640c38204e81",
    //                     "65ba785a7c3a1d9594f6d66a",
    //                     "65d5980fb36f504ead70fabb",
    //                     "65d5eb3b404076c2cd7d0eba",
    //                     "65d9698082835197735d2d10",
    //                     "65ec3be49551fbe682697d50",
    //                     "6628133f15d3ab68b3737abc",
    //                     "66376c2e15d3ab68b373c1da",
    //                     "64f5e170e0d3ebb86b49aaf5",
    //                     "664cfda415d3ab68b3741ebe",
    //                     "662389cd15d3ab68b37367c2"
    //                 ],
    //                 "instructions": [
    //                     "[\"msx\",\"kk\"]"
    //                 ],
    //                 "status": "Published",
    //                 "__v": 0,
    //                 "updatedAt": "2024-06-12T14:11:02.398Z"
    //             },
    //             {
    //                 "_id": "6492a1347fcc890c8df781e4",
    //                 "courseName": "HTML",
    //                 "courseDescription": "The Introduction to HTML course provides a comprehensive introduction to the basics of HTML (Hypertext Markup Language) programming. HTML is the foundation of web development and understanding its core concepts is essential for creating and designing websites.",
    //                 "instructor": {
    //                     "_id": "649e65590c56104d91096aed",
    //                     "firstName": "Himanshu",
    //                     "lastName": "Sangwan",
    //                     "email": "kumarhimanshusangwan@gmail.com",
    //                     "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "649e65590c56104d91096aeb",
    //                     "courses": [
    //                         "6491cc1343b57f557be05857",
    //                         "649d39d3d7bc194401bb1e8a",
    //                         "64903a50d83df5353bcf1897"
    //                     ],
    //                     "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                     "courseProgress": [],
    //                     "createdAt": "2023-06-30T05:17:13.239Z",
    //                     "updatedAt": "2023-08-08T05:22:23.241Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Structure and Semantics,\r\nStyling and Presentation,\r\nPractical Hands-on Experience",
    //                 "courseContent": [
    //                     "6496888278aab93db98766c7",
    //                     "64a67bf689ce71ba3f2e6483"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "649e9cfef6b2ffa510e02b68",
    //                         "user": "649e678f0c56104d91096b86",
    //                         "rating": 4,
    //                         "review": "The Advanced Front-End Development course took my web development skills to the next level.",
    //                         "course": "6492a1347fcc890c8df781e4",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "65d1d07c040e6fc6773893e8",
    //                         "user": "65d1bc965b9c5fa931a31729",
    //                         "rating": 5,
    //                         "review": "good",
    //                         "course": "6492a1347fcc890c8df781e4",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "664f322f15d3ab68b3742991",
    //                         "user": "6636932315d3ab68b373beb9",
    //                         "rating": 4,
    //                         "review": "random testing review",
    //                         "course": "6492a1347fcc890c8df781e4",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 599,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688630940/images/maxresdefault_1_hn5yhm.jpg",
    //                 "tag": [
    //                     "[\"hh'\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "653e8eaaff05bba0dffcab29",
    //                     "65412eead5b3fcb7072ab460",
    //                     "6544a4dc8f1cae6d587d6594",
    //                     "6500a9162bba640c38204e81",
    //                     "65d1bc965b9c5fa931a31729",
    //                     "65f071df311866cb026f2d94",
    //                     "6636932315d3ab68b373beb9",
    //                     "65caf59c907eb2b8d5cc2d96",
    //                     "666c1e8515d3ab68b3749f07"
    //                 ],
    //                 "instructions": [
    //                     "[\"ddd\"]"
    //                 ],
    //                 "status": "Published",
    //                 "__v": 1,
    //                 "updatedAt": "2024-06-14T10:43:42.461Z"
    //             },
    //             {
    //                 "_id": "6492accd77d6fe9f6fbb3cc5",
    //                 "courseName": "Introduction to JavaScript Programming",
    //                 "courseDescription": "The Introduction to JavaScript Programming course is designed to provide a comprehensive introduction to the fundamentals of JavaScript, a versatile and widely used programming language for web development. JavaScript is the backbone of dynamic and interactive web pages, enabling enhanced user experiences and functionality.",
    //                 "instructor": {
    //                     "_id": "649e65590c56104d91096aed",
    //                     "firstName": "Himanshu",
    //                     "lastName": "Sangwan",
    //                     "email": "kumarhimanshusangwan@gmail.com",
    //                     "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "649e65590c56104d91096aeb",
    //                     "courses": [
    //                         "6491cc1343b57f557be05857",
    //                         "649d39d3d7bc194401bb1e8a",
    //                         "64903a50d83df5353bcf1897"
    //                     ],
    //                     "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                     "courseProgress": [],
    //                     "createdAt": "2023-06-30T05:17:13.239Z",
    //                     "updatedAt": "2023-08-08T05:22:23.241Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Web Development Empowerment,\r\nDynamic Web Content,\r\nDynamic Web Content",
    //                 "courseContent": [
    //                     "6492acdf77d6fe9f6fbb3cca",
    //                     "64a67db367be601bd63ab0b0"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "649e9c5bf6b2ffa510e02b36",
    //                         "user": "649e678f0c56104d91096b86",
    //                         "rating": 4,
    //                         "review": "The JavaScript Fundamentals course was incredibly well-structured and easy to follow. ",
    //                         "course": "6492accd77d6fe9f6fbb3cc5",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "649fdda8f08bac0a61cba94d",
    //                         "user": "649ead68f6b2ffa510e02d47",
    //                         "rating": 4,
    //                         "review": "I recently completed the Full-Stack Web Development program, and it was a game-changer for my career. The program covered both front-end and back-end technologies, including HTML, CSS, JavaScript, Node.js, and databases. The hands-on projects and mentorship provided invaluable learning experiences.",
    //                         "course": "6492accd77d6fe9f6fbb3cc5",
    //                         "__v": 0
    //                     },
    //                     {
    //                         "_id": "6552e03514e3f75cd01a909f",
    //                         "user": "6541261e329cc76ed0055dc7",
    //                         "rating": 5,
    //                         "review": "nice course",
    //                         "course": "6492accd77d6fe9f6fbb3cc5",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 599,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631059/images/download_tswf7p.jpg",
    //                 "tag": [
    //                     "[\"hh'\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649e678f0c56104d91096b86",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "6541261e329cc76ed0055dc7",
    //                     "65950eb0d85b945ca359927a",
    //                     "65d1bc965b9c5fa931a31729",
    //                     "65f3eb1da640b186cf86ae95",
    //                     "662d125e15d3ab68b37399ab"
    //                 ],
    //                 "instructions": [
    //                     "[\"ddd\"]"
    //                 ],
    //                 "status": "Published",
    //                 "__v": 0,
    //                 "updatedAt": "2024-04-29T14:33:08.193Z"
    //             },
    //             {
    //                 "_id": "65a0a3118080723029ec7b9d",
    //                 "courseName": "Learn C++ & STL",
    //                 "courseDescription": "Learn C++ & STL",
    //                 "instructor": {
    //                     "_id": "65a0a25e0e5c81c170f5417c",
    //                     "firstName": "Sushant",
    //                     "lastName": "kkk",
    //                     "email": "sushantb.codes@gmail.com",
    //                     "password": "$2b$10$bSN0dOuQRMr/soVi/Lgq/uHn1zh6e70IwBPdbfvM6qN2nfy2CwMXa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "65a0a25e0e5c81c170f5417a",
    //                     "courses": [
    //                         "65a0a3118080723029ec7b9d"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=Sushant kkk&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-01-12T02:22:22.202Z",
    //                     "updatedAt": "2024-01-12T02:25:21.216Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Become a Good Coder",
    //                 "courseContent": [
    //                     "65a0a3248080723029ec7ba2"
    //                 ],
    //                 "ratingAndReviews": [],
    //                 "price": 0,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1705026320/images/ugxvpchyzlajbqpjpefr.jpg",
    //                 "tag": [
    //                     "[\"C++\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649fe1f8b712a2ee0cd7a7c2"
    //                 ],
    //                 "instructions": [
    //                     "[\"None\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-01-12T02:25:21.193Z",
    //                 "updatedAt": "2024-02-11T22:37:34.309Z",
    //                 "__v": 0
    //             },
    //             {
    //                 "_id": "65b7ceadea909329ce1ce840",
    //                 "courseName": "MERN stack",
    //                 "courseDescription": "this is a full stack course.",
    //                 "instructor": {
    //                     "_id": "65b7cc92149e08e779161177",
    //                     "firstName": "PRIYANSHU",
    //                     "lastName": "KUMAR",
    //                     "email": "9431pk7@GMAIL.COM",
    //                     "password": "$2b$10$Pc4vPI9qqkzqPQNC07jjnetsFiDkKnBGtZ3RoskjQQzIfeOv6R0yi",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "65b7cc92149e08e779161175",
    //                     "courses": [
    //                         "65b7ceadea909329ce1ce840"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=PRIYANSHU KUMAR&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-01-29T16:04:34.380Z",
    //                     "updatedAt": "2024-01-29T16:13:33.515Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "you will become the best develper ",
    //                 "courseContent": [
    //                     "65b7cec3ea909329ce1ce845"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "65b7d084149e08e7791611c7",
    //                         "user": "65b74d0ce0b25fef66d24f8e",
    //                         "rating": 5,
    //                         "review": "thebestcourseeverihaveearned",
    //                         "course": "65b7ceadea909329ce1ce840",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 1,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706544812/images/zhgey0lravij2hzxfiim.png",
    //                 "tag": [
    //                     "[\"web\",\"web dev\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "65b74d0ce0b25fef66d24f8e",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "65d077f90d378e3ff3e649bb"
    //                 ],
    //                 "instructions": [
    //                     "[\"a prior knowledge of web\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-01-29T16:13:33.503Z",
    //                 "updatedAt": "2024-02-29T11:51:05.652Z",
    //                 "__v": 0
    //             },
    //             {
    //                 "_id": "65bb9b3e1a9df6156a2c3ff8",
    //                 "courseName": "DSa",
    //                 "courseDescription": "safa",
    //                 "instructor": {
    //                     "_id": "65bb9abd1a9df6156a2c3fee",
    //                     "firstName": "tasc",
    //                     "lastName": "shivaay",
    //                     "email": "smortal229@gmail.com",
    //                     "password": "$2b$10$Ov3d1hxwViCy029FuqCzROfPYsCagvAlE9ouBj5Cruge/dB5PJP4y",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "65bb9abd1a9df6156a2c3fec",
    //                     "courses": [
    //                         "65bb9b3e1a9df6156a2c3ff8"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=tasc shivaay&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-02-01T13:21:01.377Z",
    //                     "updatedAt": "2024-02-01T13:23:10.694Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "code",
    //                 "courseContent": [
    //                     "65bb9b457b62ee205f61414d"
    //                 ],
    //                 "ratingAndReviews": [],
    //                 "price": 500,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706793790/images/xtjajpzuqtl90dmwykcv.jpg",
    //                 "tag": [
    //                     "[\"coding\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "65bb9c007b62ee205f614191",
    //                     "64d95ad8e4bbbd24c1606515",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "66449c6415d3ab68b373f5c4"
    //                 ],
    //                 "instructions": [
    //                     "[\"pc\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-02-01T13:23:10.671Z",
    //                 "updatedAt": "2024-05-15T21:16:34.739Z",
    //                 "__v": 0
    //             },
    //             {
    //                 "_id": "65d86cfda7e92eafe46d9013",
    //                 "courseName": "test",
    //                 "courseDescription": "dsgdsf",
    //                 "instructor": {
    //                     "_id": "65d86cd5a7e92eafe46d900c",
    //                     "firstName": "Abror",
    //                     "lastName": "Abdukayumov",
    //                     "email": "abrorkhandeveloper@gmail.com",
    //                     "password": "$2b$10$CZOQPjSGwoK9rR.3u2Al0.pGnY5Ef9sjbHG6hzMnt/D6/Jo8gncCa",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "65d86cd5a7e92eafe46d900a",
    //                     "courses": [
    //                         "65d86cfda7e92eafe46d9013"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=Abror Abdukayumov&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-02-23T10:00:53.336Z",
    //                     "updatedAt": "2024-02-23T10:01:33.667Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "sfdfsf",
    //                 "courseContent": [
    //                     "65d86d07a7e92eafe46d9018",
    //                     "65d86d0ca7e92eafe46d901d"
    //                 ],
    //                 "ratingAndReviews": [
    //                     {
    //                         "_id": "65f3ecf155fbb78f3449ca81",
    //                         "user": "65f3eb1da640b186cf86ae95",
    //                         "rating": 1,
    //                         "review": "bad song",
    //                         "course": "65d86cfda7e92eafe46d9013",
    //                         "__v": 0
    //                     }
    //                 ],
    //                 "price": 3223,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1708682492/images/na8e36zh3z2ba9snn152.jpg",
    //                 "tag": [
    //                     "[\"fff\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "65f3eb1da640b186cf86ae95"
    //                 ],
    //                 "instructions": [
    //                     "[\"Abror\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-02-23T10:01:33.657Z",
    //                 "updatedAt": "2024-03-15T06:38:41.300Z",
    //                 "__v": 0
    //             },
    //             {
    //                 "_id": "65e82990f539eaebb38a933a",
    //                 "courseName": "HTML & CSS",
    //                 "courseDescription": "web data",
    //                 "instructor": {
    //                     "_id": "65e2c21c398e1d0c3a01da04",
    //                     "firstName": "Aastha",
    //                     "lastName": "Shah",
    //                     "email": "aastha_20121@ldrp.ac.in",
    //                     "password": "$2b$10$NhijAWvnl5PUBm9ZKg5t6e7piEEHR55/hw.V.hHcDIh4tfA7S913.",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "65e2c21c398e1d0c3a01da02",
    //                     "courses": [
    //                         "65e80c99f51b299a2c820d81",
    //                         "65e823c9f634a8ee8df99617",
    //                         "65e82990f539eaebb38a933a",
    //                         "66272f1515d3ab68b37375dc",
    //                         "662730d315d3ab68b373761b",
    //                         "6627331c15d3ab68b3737643",
    //                         "662735a115d3ab68b373764e"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=Aastha Shah&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-03-02T06:07:24.506Z",
    //                     "updatedAt": "2024-04-23T04:14:25.117Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "learn",
    //                 "courseContent": [
    //                     "65e82999f539eaebb38a933f"
    //                 ],
    //                 "ratingAndReviews": [],
    //                 "price": 1000,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1709713808/images/wc6wzzbetmmby0dw6x1p.png",
    //                 "tag": [
    //                     "[\"web\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "649fe1f8b712a2ee0cd7a7c2"
    //                 ],
    //                 "instructions": [
    //                     "[\"nothing\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-03-06T08:30:08.513Z",
    //                 "updatedAt": "2024-06-08T15:27:22.936Z",
    //                 "__v": 0
    //             },
    //             {
    //                 "_id": "6644c19115d3ab68b373f763",
    //                 "courseName": "Basics of Web Dev",
    //                 "courseDescription": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //                 "instructor": {
    //                     "_id": "6644c0bb15d3ab68b373f75b",
    //                     "firstName": "Popo",
    //                     "lastName": "Bhatt",
    //                     "email": "chirantan.mazumdar.20@aot.edu.in",
    //                     "password": "$2b$10$JOaBxkHGCJrggyMYlH27FOk3oYj3fShktXdpeo5zvvF7dsjELuLpy",
    //                     "accountType": "Instructor",
    //                     "active": true,
    //                     "approved": true,
    //                     "additionalDetails": "6644c0bb15d3ab68b373f759",
    //                     "courses": [
    //                         "6644c19115d3ab68b373f763",
    //                         "6645111e15d3ab68b373fa76",
    //                         "665f422015d3ab68b3745cd0",
    //                         "665f481515d3ab68b3745d50"
    //                     ],
    //                     "image": "https://api.dicebear.com/6.x/initials/svg?seed=Popo Bhatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                     "courseProgress": [],
    //                     "createdAt": "2024-05-15T14:03:39.523Z",
    //                     "updatedAt": "2024-06-04T17:00:05.494Z",
    //                     "__v": 0
    //                 },
    //                 "whatYouWillLearn": "Learn everything from scratch",
    //                 "courseContent": [
    //                     "6644c19f15d3ab68b373f768"
    //                 ],
    //                 "ratingAndReviews": [],
    //                 "price": 499,
    //                 "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1715782032/images/y2s5t7r7ssexbb0jkmu2.png",
    //                 "tag": [
    //                     "[\"Web development\"]"
    //                 ],
    //                 "category": "6475dbeb49dcc886b5698441",
    //                 "studentsEnrolled": [
    //                     "66449c6415d3ab68b373f5c4",
    //                     "649fe1f8b712a2ee0cd7a7c2",
    //                     "665f3f2415d3ab68b3745b82"
    //                 ],
    //                 "instructions": [
    //                     "[\"NIL\"]"
    //                 ],
    //                 "status": "Published",
    //                 "createdAt": "2024-05-15T14:07:13.053Z",
    //                 "updatedAt": "2024-06-04T16:26:08.372Z",
    //                 "__v": 0
    //             }
    //         ]
    //     },
    //     "differentCourses": [
    //         {
    //             "_id": "6496eb2378aab93db9876a6b",
    //             "courseName": "Python Basic 2023",
    //             "courseDescription": "The Python Basics course is designed for beginners who want to learn the fundamentals of Python programming.\r\nExplore the core concepts of Python, including variables, data types, control flow, loops, functions, and more.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Beginner-Friendly: Python's intuitive syntax and readability make it an excellent choice for beginners entering the world of programming.",
    //             "courseContent": [
    //                 "6496eb5578aab93db9876a70",
    //                 "6496ebb078aab93db9876a85",
    //                 "6496ebd978aab93db9876a93",
    //                 "6496ec0678aab93db9876aa1",
    //                 "6496ec2b78aab93db9876aaf"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e9a07f6b2ffa510e02a88",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 4,
    //                     "review": "The Python Basics course was a fantastic introduction to programming",
    //                     "course": "6496eb2378aab93db9876a6b",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "6507127058db362046ef0fe7",
    //                     "user": "64d95ad8e4bbbd24c1606515",
    //                     "rating": 4,
    //                     "review": "very good course",
    //                     "course": "6496eb2378aab93db9876a6b",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "6658cf5815d3ab68b374404a",
    //                     "user": "6636932315d3ab68b373beb9",
    //                     "rating": 5,
    //                     "review": "Excellent project Most optimized One",
    //                     "course": "6496eb2378aab93db9876a6b",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 999,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631640/images/1106091-Python_iw6fih.jpg",
    //             "tag": [
    //                 "[\"python\"]"
    //             ],
    //             "category": "6475dbf749dcc886b5698443",
    //             "studentsEnrolled": [
    //                 "649e678f0c56104d91096b86",
    //                 "64f5e170e0d3ebb86b49aaf5",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "64d95ad8e4bbbd24c1606515",
    //                 "6541261e329cc76ed0055dc7",
    //                 "65720a6651ed133073d1791d",
    //                 "65950eb0d85b945ca359927a",
    //                 "65f5577dceae0b14452af329",
    //                 "65fed97c54570d396d3cf1b3",
    //                 "661b4cb915d3ab68b3734b26",
    //                 "662d125e15d3ab68b37399ab",
    //                 "66103d5b15d3ab68b3731d8f",
    //                 "66449c6415d3ab68b373f5c4",
    //                 "6636932315d3ab68b373beb9",
    //                 "665b22b015d3ab68b37447d1"
    //             ],
    //             "instructions": [
    //                 "[\"Regular practice\",\"Discussions and exercises\",\"Python documentation to deepen your understanding\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2023-06-24T13:09:55.418Z",
    //             "updatedAt": "2024-06-01T13:37:22.832Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65e0c748cf994bb7038a4510",
    //             "courseName": "cpp",
    //             "courseDescription": "cgshghsg",
    //             "instructor": {
    //                 "_id": "65e0c6b2610b39b6c14e5ef8",
    //                 "firstName": "Aftab",
    //                 "lastName": "Ansari",
    //                 "email": "ansariaftab9762@mailinator.com",
    //                 "password": "$2b$10$LHxbnUugBWBMsglt.b1jh.8aftEAMIA/LkKH6xOSdpD5LUJq5QbUC",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65e0c6b2610b39b6c14e5ef6",
    //                 "courses": [
    //                     "65e0c748cf994bb7038a4510"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Aftab Ansari&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-02-29T18:02:26.429Z",
    //                 "updatedAt": "2024-02-29T18:04:56.626Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": " dxgxxxx",
    //             "courseContent": [
    //                 "65e0c74ecf994bb7038a4515"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 0,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1709229895/images/wg4rpsz1js2zzevswzxt.webp",
    //             "tag": [
    //                 "[\"gssd\",\"sdg\",\"gsdgf\",\"gh\"]"
    //             ],
    //             "category": "6475dbf749dcc886b5698443",
    //             "studentsEnrolled": [
    //                 "664cfda415d3ab68b3741ebe"
    //             ],
    //             "instructions": [
    //                 "[\"geds \",\"geds  dvea\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-02-29T18:04:56.607Z",
    //             "updatedAt": "2024-06-05T14:43:24.811Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65bac30c60745b3af4488070",
    //             "courseName": "Instructor",
    //             "courseDescription": "This is instructor",
    //             "instructor": {
    //                 "_id": "65bac29938a42ea995f0352b",
    //                 "firstName": "Instructor",
    //                 "lastName": "Dev",
    //                 "email": "bortifekku@gufum.com",
    //                 "password": "$2b$10$ngoOJ0mVKuyhIqVEl3oGtuQ1aBeZfOo97RQ1sbS9yiU2TxqfMXooK",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65bac29938a42ea995f03529",
    //                 "courses": [
    //                     "65bac30c60745b3af4488070"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Instructor Dev&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-01-31T21:58:49.072Z",
    //                 "updatedAt": "2024-01-31T22:00:44.935Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "too much ",
    //             "courseContent": [
    //                 "65bac31560745b3af4488075",
    //                 "65bac32460745b3af448807a"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 12,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706738444/images/gknbyzec3eibw1idswoy.jpg",
    //             "tag": [
    //                 "[\"c++\",\"go\"]"
    //             ],
    //             "category": "6496e43c78aab93db98769e9",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "65d1bc965b9c5fa931a31729",
    //                 "65fed97c54570d396d3cf1b3",
    //                 "64d95ad8e4bbbd24c1606515",
    //                 "66103d5b15d3ab68b3731d8f",
    //                 "665b2f0815d3ab68b3744a30",
    //                 "66658a8115d3ab68b3747ede"
    //             ],
    //             "instructions": [
    //                 "[\"you can't handle this\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-01-31T22:00:44.914Z",
    //             "updatedAt": "2024-06-09T10:58:40.416Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65e8368ef08b2a8e35fd78f9",
    //             "courseName": "Deep Learning",
    //             "courseDescription": "Cover Basics of deep Learning",
    //             "instructor": {
    //                 "_id": "65e83335ae67dcb83c2c4856",
    //                 "firstName": "Ashutosh",
    //                 "lastName": "Kumar",
    //                 "email": "kumarashu81508@gmail.com",
    //                 "password": "$2b$10$1XNL.ClEIPKsIhm4d3zFdukWl91wTtzNlMMOQfphpenF.1EaYQTWK",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65e83335ae67dcb83c2c4854",
    //                 "courses": [
    //                     "65e83442ae67dcb83c2c485e",
    //                     "65e8368ef08b2a8e35fd78f9",
    //                     "65f2b12e71d45ca876bdf482"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Ashutosh Kumar&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-03-06T09:11:17.627Z",
    //                 "updatedAt": "2024-03-14T08:11:26.713Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Learn from the very Scratch",
    //             "courseContent": [
    //                 "65e83694f08b2a8e35fd78fe",
    //                 "65e836a2f08b2a8e35fd7903"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 5000,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1709717134/images/ryfw2ktwhqst1s3ekzgx.webp",
    //             "tag": [
    //                 "[\"Artificial Intellegence \"]"
    //             ],
    //             "category": "6496e47778aab93db98769eb",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "66445a5715d3ab68b373f36f",
    //                 "66449c6415d3ab68b373f5c4",
    //                 "665f3f2415d3ab68b3745b82",
    //                 "664cfda415d3ab68b3741ebe"
    //             ],
    //             "instructions": [
    //                 "[\"No Prerequisites\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-03-06T09:25:34.536Z",
    //             "updatedAt": "2024-06-05T14:43:28.062Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6499202a3272e5a6b38a8e8b",
    //             "courseName": "JavaScript 2023",
    //             "courseDescription": "In this course, you will learn the core concepts of JavaScript, including variables, data types, operators, control structures, and functions. You will explore the Document Object Model (DOM) and learn how to manipulate web page elements dynamically, responding to user interactions and events.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "JSON Data Manipulation,\r\nWeb API Integration,\r\nEntry Point for Advanced Web Developmen",
    //             "courseContent": [
    //                 "649920373272e5a6b38a8e90",
    //                 "64a67e1b67be601bd63ab0d1"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e9c78f6b2ffa510e02b47",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 5,
    //                     "review": "The Advanced JavaScript Concepts course took my JavaScript skills to the next level.",
    //                     "course": "6499202a3272e5a6b38a8e8b",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "649fdabcf08bac0a61cba834",
    //                     "user": "649ead68f6b2ffa510e02d47",
    //                     "rating": 4,
    //                     "review": "great course",
    //                     "course": "6499202a3272e5a6b38a8e8b",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "65d87ad136bcb69bd676e03c",
    //                     "user": "65d87a5336bcb69bd676e027",
    //                     "rating": 5,
    //                     "review": "Good",
    //                     "course": "6499202a3272e5a6b38a8e8b",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 799,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631686/images/1_YQgaKfVzK-YpxyT3NYqJAg_zcvpgb.png",
    //             "tag": [
    //                 "[\"hh'\"]"
    //             ],
    //             "category": "6496e4e578aab93db98769fc",
    //             "studentsEnrolled": [
    //                 "649e678f0c56104d91096b86",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "650d9e3bf4696005bb29aaa3",
    //                 "6500a9162bba640c38204e81",
    //                 "65d87a5336bcb69bd676e027"
    //             ],
    //             "instructions": [
    //                 "[\"ddd\",\"fk\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2023-06-26T05:20:42.726Z",
    //             "updatedAt": "2024-02-23T11:00:33.676Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6645111e15d3ab68b373fa76",
    //             "courseName": "AOT placement 2024 crash course ",
    //             "courseDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //             "instructor": {
    //                 "_id": "6644c0bb15d3ab68b373f75b",
    //                 "firstName": "Popo",
    //                 "lastName": "Bhatt",
    //                 "email": "chirantan.mazumdar.20@aot.edu.in",
    //                 "password": "$2b$10$JOaBxkHGCJrggyMYlH27FOk3oYj3fShktXdpeo5zvvF7dsjELuLpy",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "6644c0bb15d3ab68b373f759",
    //                 "courses": [
    //                     "6644c19115d3ab68b373f763",
    //                     "6645111e15d3ab68b373fa76",
    //                     "665f422015d3ab68b3745cd0",
    //                     "665f481515d3ab68b3745d50"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Popo Bhatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-05-15T14:03:39.523Z",
    //                 "updatedAt": "2024-06-04T17:00:05.494Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //             "courseContent": [
    //                 "6645117515d3ab68b373fa7b",
    //                 "6645127d15d3ab68b373fa80"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 7000,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1715802398/images/dleofhy4byjzxawmwxlb.png",
    //             "tag": [
    //                 "[\"DSA\",\"APTI\"]"
    //             ],
    //             "category": "6496e4e578aab93db98769fc",
    //             "studentsEnrolled": [
    //                 "66449c6415d3ab68b373f5c4",
    //                 "66462daf15d3ab68b3740154",
    //                 "665f3f2415d3ab68b3745b82"
    //             ],
    //             "instructions": [
    //                 "[\"Not so necessary \"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-05-15T19:46:38.557Z",
    //             "updatedAt": "2024-06-04T16:26:11.695Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "665f422015d3ab68b3745cd0",
    //             "courseName": "BlockChain Security",
    //             "courseDescription": "It is enriched with introductory lessons on blockchain and cryptography.",
    //             "instructor": {
    //                 "_id": "6644c0bb15d3ab68b373f75b",
    //                 "firstName": "Popo",
    //                 "lastName": "Bhatt",
    //                 "email": "chirantan.mazumdar.20@aot.edu.in",
    //                 "password": "$2b$10$JOaBxkHGCJrggyMYlH27FOk3oYj3fShktXdpeo5zvvF7dsjELuLpy",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "6644c0bb15d3ab68b373f759",
    //                 "courses": [
    //                     "6644c19115d3ab68b373f763",
    //                     "6645111e15d3ab68b373fa76",
    //                     "665f422015d3ab68b3745cd0",
    //                     "665f481515d3ab68b3745d50"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Popo Bhatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-05-15T14:03:39.523Z",
    //                 "updatedAt": "2024-06-04T17:00:05.494Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Blockchain courses can provide a thorough understanding of blockchain technology, its working principles, and its applications. They can also help you understand blockchain's security, immutability, and scalability.",
    //             "courseContent": [
    //                 "665f422e15d3ab68b3745cd5",
    //                 "665f423715d3ab68b3745cda"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 200,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1717518880/images/kepatdc6ei19sqq7jgtv.webp",
    //             "tag": [
    //                 "[\"#blockchain\",\"#cryptocurrencies\"]"
    //             ],
    //             "category": "6496e56a78aab93db98769fe",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2"
    //             ],
    //             "instructions": [
    //                 "[\"Cryptography\",\"Blockchain architecture\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-06-04T16:34:40.952Z",
    //             "updatedAt": "2024-06-14T05:39:44.473Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "665f481515d3ab68b3745d50",
    //             "courseName": "Basics of blockchain",
    //             "courseDescription": " type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of",
    //             "instructor": {
    //                 "_id": "6644c0bb15d3ab68b373f75b",
    //                 "firstName": "Popo",
    //                 "lastName": "Bhatt",
    //                 "email": "chirantan.mazumdar.20@aot.edu.in",
    //                 "password": "$2b$10$JOaBxkHGCJrggyMYlH27FOk3oYj3fShktXdpeo5zvvF7dsjELuLpy",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "6644c0bb15d3ab68b373f759",
    //                 "courses": [
    //                     "6644c19115d3ab68b373f763",
    //                     "6645111e15d3ab68b373fa76",
    //                     "665f422015d3ab68b3745cd0",
    //                     "665f481515d3ab68b3745d50"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Popo Bhatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-05-15T14:03:39.523Z",
    //                 "updatedAt": "2024-06-04T17:00:05.494Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": " type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of",
    //             "courseContent": [
    //                 "665f482515d3ab68b3745d55",
    //                 "665f486915d3ab68b3745d62"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 2000,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1717520404/images/mlmbrdgiwwxn0yvafeex.jpg",
    //             "tag": [
    //                 "[\"Blockchain\",\"Development\"]"
    //             ],
    //             "category": "6496e56a78aab93db98769fe",
    //             "studentsEnrolled": [
    //                 "665f3f2415d3ab68b3745b82"
    //             ],
    //             "instructions": [
    //                 "[\"Laptop with fast internet\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-06-04T17:00:05.476Z",
    //             "updatedAt": "2024-06-04T17:03:56.950Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "660e61e735bdd12d5ae52102",
    //             "courseName": "Cloud_Web develop",
    //             "courseDescription": "cloud",
    //             "instructor": {
    //                 "_id": "65caf6dab0f0f6372af36c3c",
    //                 "firstName": "Vishal",
    //                 "lastName": "Yadav",
    //                 "email": "vishalyadavaas@gmail.com",
    //                 "password": "$2b$10$9dEebObhYZtQB62/aREHkuaj0aFTtMxLolZtDgldxR/6nIOPmgLte",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65caf6dab0f0f6372af36c3a",
    //                 "courses": [
    //                     "660e61e735bdd12d5ae52102"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Vishal Yadav&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-02-13T04:58:02.800Z",
    //                 "updatedAt": "2024-04-04T08:16:39.263Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "learn cloud web development",
    //             "courseContent": [
    //                 "660e61ec35bdd12d5ae52107"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 13,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1712218598/images/rnfe5jpvspmnmhstkulq.jpg",
    //             "tag": [
    //                 "[\"cloud storage\"]"
    //             ],
    //             "category": "6496e5af78aab93db9876a0f",
    //             "studentsEnrolled": [],
    //             "instructions": [
    //                 "[\"vishal\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-04-04T08:16:39.244Z",
    //             "updatedAt": "2024-04-04T08:17:19.792Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65f5649da659f35cabc1d766",
    //             "courseName": "Generative AI",
    //             "courseDescription": "Generative AI: Foundations Course: A course that covers what the future of GenAI models is, or how you can utilize data generation for your own projects \r\n",
    //             "instructor": {
    //                 "_id": "65f562a6a659f35cabc1d75a",
    //                 "firstName": "vaibhav",
    //                 "lastName": "dixit",
    //                 "email": "vaibhavdixitcse@gmail.com",
    //                 "password": "$2b$10$esBiaG2.Oj2p0/zsKOZrmuJxN0qN4nMiFMBBUbaQ9PHIXqW5vKA4e",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65f562a6a659f35cabc1d758",
    //                 "courses": [
    //                     "65f5649da659f35cabc1d766"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1710698360/images/tziqyhtnpu2fuufx4nw8.jpg",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-03-16T09:13:10.117Z",
    //                 "updatedAt": "2024-03-17T17:59:21.012Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Generative AI accelerates processes by automating repetitive tasks, enabling teams to focus on the work of higher value. The advantages of generative AI in enhancing efficiency become evident through abounding examples: Legal professionals can use Gen AI to review and draft legal documents more efficiently",
    //             "courseContent": [
    //                 "65f564aaa659f35cabc1d76b",
    //                 "65f565bca659f35cabc1d778"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "65f72ea937c0343fbbce7041",
    //                     "user": "65f5577dceae0b14452af329",
    //                     "rating": 5,
    //                     "review": "Best course in market",
    //                     "course": "65f5649da659f35cabc1d766",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 10000,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1710580893/images/a1fyusupf91yckp6skd7.jpg",
    //             "tag": [
    //                 "[\"Generative Ai\",\"AI\",\"coding\"]"
    //             ],
    //             "category": "64f606900c9b6f3ab0567b9c",
    //             "studentsEnrolled": [
    //                 "65f5577dceae0b14452af329",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "66376c2e15d3ab68b373c1da"
    //             ],
    //             "instructions": [
    //                 "[\"maths\",\"python\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-03-16T09:21:33.556Z",
    //             "updatedAt": "2024-05-05T11:28:04.374Z",
    //             "__v": 0
    //         }
    //     ],
    //     "mostSellingCourses": [
    //         {
    //             "_id": "6491cc1343b57f557be05857",
    //             "courseName": "Android App Developement",
    //             "courseDescription": "Learn how to build Android applications using Java or Kotlin. Understand the Android development ecosystem, UI design, data storage, and integration with device features.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Mobile Game Development,\r\nAndroid App Development,\r\nJava and Kotlin",
    //             "courseContent": [
    //                 "6491cc1f43b57f557be0585c",
    //                 "6491cc2743b57f557be05861",
    //                 "64a67a8f89ce71ba3f2e645e"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e9fe2f6b2ffa510e02be5",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 4,
    //                     "review": "I recently completed the Full-Stack Web Development program, and it was a game-changer for my career.",
    //                     "course": "6491cc1343b57f557be05857",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "64da2a4901922332b890fecc",
    //                     "user": "64da29bd01922332b890fe94",
    //                     "rating": 2,
    //                     "review": "m",
    //                     "course": "6491cc1343b57f557be05857",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "657904568f28d97518c56786",
    //                     "user": "657902eda5062c4545ca6baa",
    //                     "rating": 5,
    //                     "review": "k",
    //                     "course": "6491cc1343b57f557be05857",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "660e5cb435bdd12d5ae51f19",
    //                     "user": "65caf59c907eb2b8d5cc2d96",
    //                     "rating": 4,
    //                     "review": "good",
    //                     "course": "6491cc1343b57f557be05857",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 1199,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631239/images/maxresdefault_2_yii7cf.jpg",
    //             "tag": [
    //                 "[\"hh\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649e678f0c56104d91096b86",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "64b8097ec6d9ec5ee55e1af8",
    //                 "64da29bd01922332b890fe94",
    //                 "64dc75cea05dc6f4844b50e5",
    //                 "64ddf3430b80c3561c3a0a61",
    //                 "64e34489d4d32b3a4bf2f46f",
    //                 "6501777d6c7e5cc3736e71c9",
    //                 "650d9e3bf4696005bb29aaa3",
    //                 "650ef4672258d6a5c43e7c4b",
    //                 "651d2c8de96d907b03782aad",
    //                 "651fc967db6acfcc92e78c9d",
    //                 "654220ae4687b5c69ac9aff9",
    //                 "654b77d2be33b0c2067d3dd3",
    //                 "6500a9162bba640c38204e81",
    //                 "65720a6651ed133073d1791d",
    //                 "657902eda5062c4545ca6baa",
    //                 "65896f98cf412d2b1a9bc931",
    //                 "65b74d0ce0b25fef66d24f8e",
    //                 "65ba785a7c3a1d9594f6d66a",
    //                 "65c9493cde5043eaa9068f89",
    //                 "65cf6a78e512e8ff37d3ae2c",
    //                 "65e310f7ab4c0a9cc5ab7f5a",
    //                 "6605b1b454570d396d3d0014",
    //                 "65caf59c907eb2b8d5cc2d96",
    //                 "66103d5b15d3ab68b3731d8f",
    //                 "6618b8d415d3ab68b37340d8",
    //                 "6620e18a15d3ab68b3735e59",
    //                 "65c5beede7565596181b222b",
    //                 "6635376915d3ab68b373b895",
    //                 "663b656a15d3ab68b373d605",
    //                 "663ce70e15d3ab68b373db1d",
    //                 "6644a20d15d3ab68b373f680",
    //                 "664c823515d3ab68b3741874",
    //                 "664f6bd215d3ab68b3742ae0",
    //                 "6663fa3e15d3ab68b374758d"
    //             ],
    //             "instructions": [
    //                 "[\"kk\"]"
    //             ],
    //             "status": "Published",
    //             "__v": 0,
    //             "updatedAt": "2024-06-08T06:30:41.493Z"
    //         },
    //         {
    //             "_id": "64903a50d83df5353bcf1897",
    //             "courseName": "Java",
    //             "courseDescription": "The course will cover topics like exception handling, input/output operations, file handling, and basic GUI (Graphical User Interface) development using Java Swing. You will also delve into topics such as collections, generics, and basic multithreading concepts, which are essential for developing efficient and scalable applications.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Foundation in Java Programming,\r\nReal-World Application Development,\r\nVersatility and Market Demand",
    //             "courseContent": [
    //                 "64903a57d83df5353bcf189c",
    //                 "6496c31378aab93db9876816",
    //                 "6522bdef270f8be8352fc027",
    //                 "6560eaf243bb76fadae2624f",
    //                 "656125ed42652fb1e477a85b",
    //                 "65c94ae6f4fc4e173c3e6479"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e991bf6b2ffa510e02a76",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 5,
    //                     "review": "Greate Course.The Web Development Bootcamp exceeded my expectations.",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "64f0d4d58a614ed1d4cc2381",
    //                     "user": "64f0d268362cd4d21148b6b4",
    //                     "rating": 3,
    //                     "review": "best ",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "6552ddc47afcd3c95fe3fd54",
    //                     "user": "6541261e329cc76ed0055dc7",
    //                     "rating": 5,
    //                     "review": "Nice",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "65ddfd32dd46edc63dea197a",
    //                     "user": "65d9698082835197735d2d10",
    //                     "rating": 1,
    //                     "review": "Bad course",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "66376d0615d3ab68b373c212",
    //                     "user": "66376c2e15d3ab68b373c1da",
    //                     "rating": 5,
    //                     "review": "nice course",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "664501ab15d3ab68b373f9ab",
    //                     "user": "64f5e170e0d3ebb86b49aaf5",
    //                     "rating": 5,
    //                     "review": "nice",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "666079d515d3ab68b37462f3",
    //                     "user": "664cfda415d3ab68b3741ebe",
    //                     "rating": 4,
    //                     "review": "good course",
    //                     "course": "64903a50d83df5353bcf1897",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 1199,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688630790/images/computers-others-wallpaper-preview_suhi9b.jpg",
    //             "tag": [
    //                 "[\"java\",\"language\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649e678f0c56104d91096b86",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "64d95ad8e4bbbd24c1606515",
    //                 "64f0d268362cd4d21148b6b4",
    //                 "64f8b8160f8820c5b04df88e",
    //                 "6544a4dc8f1cae6d587d6594",
    //                 "6541261e329cc76ed0055dc7",
    //                 "654b77d2be33b0c2067d3dd3",
    //                 "6500a9162bba640c38204e81",
    //                 "65ba785a7c3a1d9594f6d66a",
    //                 "65d5980fb36f504ead70fabb",
    //                 "65d5eb3b404076c2cd7d0eba",
    //                 "65d9698082835197735d2d10",
    //                 "65ec3be49551fbe682697d50",
    //                 "6628133f15d3ab68b3737abc",
    //                 "66376c2e15d3ab68b373c1da",
    //                 "64f5e170e0d3ebb86b49aaf5",
    //                 "664cfda415d3ab68b3741ebe",
    //                 "662389cd15d3ab68b37367c2"
    //             ],
    //             "instructions": [
    //                 "[\"msx\",\"kk\"]"
    //             ],
    //             "status": "Published",
    //             "__v": 0,
    //             "updatedAt": "2024-06-12T14:11:02.398Z"
    //         },
    //         {
    //             "_id": "6492a1347fcc890c8df781e4",
    //             "courseName": "HTML",
    //             "courseDescription": "The Introduction to HTML course provides a comprehensive introduction to the basics of HTML (Hypertext Markup Language) programming. HTML is the foundation of web development and understanding its core concepts is essential for creating and designing websites.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Structure and Semantics,\r\nStyling and Presentation,\r\nPractical Hands-on Experience",
    //             "courseContent": [
    //                 "6496888278aab93db98766c7",
    //                 "64a67bf689ce71ba3f2e6483"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e9cfef6b2ffa510e02b68",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 4,
    //                     "review": "The Advanced Front-End Development course took my web development skills to the next level.",
    //                     "course": "6492a1347fcc890c8df781e4",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "65d1d07c040e6fc6773893e8",
    //                     "user": "65d1bc965b9c5fa931a31729",
    //                     "rating": 5,
    //                     "review": "good",
    //                     "course": "6492a1347fcc890c8df781e4",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "664f322f15d3ab68b3742991",
    //                     "user": "6636932315d3ab68b373beb9",
    //                     "rating": 4,
    //                     "review": "random testing review",
    //                     "course": "6492a1347fcc890c8df781e4",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 599,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688630940/images/maxresdefault_1_hn5yhm.jpg",
    //             "tag": [
    //                 "[\"hh'\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "653e8eaaff05bba0dffcab29",
    //                 "65412eead5b3fcb7072ab460",
    //                 "6544a4dc8f1cae6d587d6594",
    //                 "6500a9162bba640c38204e81",
    //                 "65d1bc965b9c5fa931a31729",
    //                 "65f071df311866cb026f2d94",
    //                 "6636932315d3ab68b373beb9",
    //                 "65caf59c907eb2b8d5cc2d96",
    //                 "666c1e8515d3ab68b3749f07"
    //             ],
    //             "instructions": [
    //                 "[\"ddd\"]"
    //             ],
    //             "status": "Published",
    //             "__v": 1,
    //             "updatedAt": "2024-06-14T10:43:42.461Z"
    //         },
    //         {
    //             "_id": "6492accd77d6fe9f6fbb3cc5",
    //             "courseName": "Introduction to JavaScript Programming",
    //             "courseDescription": "The Introduction to JavaScript Programming course is designed to provide a comprehensive introduction to the fundamentals of JavaScript, a versatile and widely used programming language for web development. JavaScript is the backbone of dynamic and interactive web pages, enabling enhanced user experiences and functionality.",
    //             "instructor": {
    //                 "_id": "649e65590c56104d91096aed",
    //                 "firstName": "Himanshu",
    //                 "lastName": "Sangwan",
    //                 "email": "kumarhimanshusangwan@gmail.com",
    //                 "password": "$2b$10$hGvs8.3SMQSBT5obcT2uxeBGOcXERQOqNud3wExr1R0SbdVXjDzLa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "649e65590c56104d91096aeb",
    //                 "courses": [
    //                     "6491cc1343b57f557be05857",
    //                     "649d39d3d7bc194401bb1e8a",
    //                     "64903a50d83df5353bcf1897"
    //                 ],
    //                 "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688817006/images/epgd4lpdt5bspvnpcvtt.png",
    //                 "courseProgress": [],
    //                 "createdAt": "2023-06-30T05:17:13.239Z",
    //                 "updatedAt": "2023-08-08T05:22:23.241Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Web Development Empowerment,\r\nDynamic Web Content,\r\nDynamic Web Content",
    //             "courseContent": [
    //                 "6492acdf77d6fe9f6fbb3cca",
    //                 "64a67db367be601bd63ab0b0"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "649e9c5bf6b2ffa510e02b36",
    //                     "user": "649e678f0c56104d91096b86",
    //                     "rating": 4,
    //                     "review": "The JavaScript Fundamentals course was incredibly well-structured and easy to follow. ",
    //                     "course": "6492accd77d6fe9f6fbb3cc5",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "649fdda8f08bac0a61cba94d",
    //                     "user": "649ead68f6b2ffa510e02d47",
    //                     "rating": 4,
    //                     "review": "I recently completed the Full-Stack Web Development program, and it was a game-changer for my career. The program covered both front-end and back-end technologies, including HTML, CSS, JavaScript, Node.js, and databases. The hands-on projects and mentorship provided invaluable learning experiences.",
    //                     "course": "6492accd77d6fe9f6fbb3cc5",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "6552e03514e3f75cd01a909f",
    //                     "user": "6541261e329cc76ed0055dc7",
    //                     "rating": 5,
    //                     "review": "nice course",
    //                     "course": "6492accd77d6fe9f6fbb3cc5",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 599,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631059/images/download_tswf7p.jpg",
    //             "tag": [
    //                 "[\"hh'\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649e678f0c56104d91096b86",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "6541261e329cc76ed0055dc7",
    //                 "65950eb0d85b945ca359927a",
    //                 "65d1bc965b9c5fa931a31729",
    //                 "65f3eb1da640b186cf86ae95",
    //                 "662d125e15d3ab68b37399ab"
    //             ],
    //             "instructions": [
    //                 "[\"ddd\"]"
    //             ],
    //             "status": "Published",
    //             "__v": 0,
    //             "updatedAt": "2024-04-29T14:33:08.193Z"
    //         },
    //         {
    //             "_id": "65a0a3118080723029ec7b9d",
    //             "courseName": "Learn C++ & STL",
    //             "courseDescription": "Learn C++ & STL",
    //             "instructor": {
    //                 "_id": "65a0a25e0e5c81c170f5417c",
    //                 "firstName": "Sushant",
    //                 "lastName": "kkk",
    //                 "email": "sushantb.codes@gmail.com",
    //                 "password": "$2b$10$bSN0dOuQRMr/soVi/Lgq/uHn1zh6e70IwBPdbfvM6qN2nfy2CwMXa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65a0a25e0e5c81c170f5417a",
    //                 "courses": [
    //                     "65a0a3118080723029ec7b9d"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Sushant kkk&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-01-12T02:22:22.202Z",
    //                 "updatedAt": "2024-01-12T02:25:21.216Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Become a Good Coder",
    //             "courseContent": [
    //                 "65a0a3248080723029ec7ba2"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 0,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1705026320/images/ugxvpchyzlajbqpjpefr.jpg",
    //             "tag": [
    //                 "[\"C++\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2"
    //             ],
    //             "instructions": [
    //                 "[\"None\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-01-12T02:25:21.193Z",
    //             "updatedAt": "2024-02-11T22:37:34.309Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65b7ceadea909329ce1ce840",
    //             "courseName": "MERN stack",
    //             "courseDescription": "this is a full stack course.",
    //             "instructor": {
    //                 "_id": "65b7cc92149e08e779161177",
    //                 "firstName": "PRIYANSHU",
    //                 "lastName": "KUMAR",
    //                 "email": "9431pk7@GMAIL.COM",
    //                 "password": "$2b$10$Pc4vPI9qqkzqPQNC07jjnetsFiDkKnBGtZ3RoskjQQzIfeOv6R0yi",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65b7cc92149e08e779161175",
    //                 "courses": [
    //                     "65b7ceadea909329ce1ce840"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=PRIYANSHU KUMAR&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-01-29T16:04:34.380Z",
    //                 "updatedAt": "2024-01-29T16:13:33.515Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "you will become the best develper ",
    //             "courseContent": [
    //                 "65b7cec3ea909329ce1ce845"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "65b7d084149e08e7791611c7",
    //                     "user": "65b74d0ce0b25fef66d24f8e",
    //                     "rating": 5,
    //                     "review": "thebestcourseeverihaveearned",
    //                     "course": "65b7ceadea909329ce1ce840",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 1,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706544812/images/zhgey0lravij2hzxfiim.png",
    //             "tag": [
    //                 "[\"web\",\"web dev\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "65b74d0ce0b25fef66d24f8e",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "65d077f90d378e3ff3e649bb"
    //             ],
    //             "instructions": [
    //                 "[\"a prior knowledge of web\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-01-29T16:13:33.503Z",
    //             "updatedAt": "2024-02-29T11:51:05.652Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65bb9b3e1a9df6156a2c3ff8",
    //             "courseName": "DSa",
    //             "courseDescription": "safa",
    //             "instructor": {
    //                 "_id": "65bb9abd1a9df6156a2c3fee",
    //                 "firstName": "tasc",
    //                 "lastName": "shivaay",
    //                 "email": "smortal229@gmail.com",
    //                 "password": "$2b$10$Ov3d1hxwViCy029FuqCzROfPYsCagvAlE9ouBj5Cruge/dB5PJP4y",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65bb9abd1a9df6156a2c3fec",
    //                 "courses": [
    //                     "65bb9b3e1a9df6156a2c3ff8"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=tasc shivaay&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-02-01T13:21:01.377Z",
    //                 "updatedAt": "2024-02-01T13:23:10.694Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "code",
    //             "courseContent": [
    //                 "65bb9b457b62ee205f61414d"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 500,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706793790/images/xtjajpzuqtl90dmwykcv.jpg",
    //             "tag": [
    //                 "[\"coding\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "65bb9c007b62ee205f614191",
    //                 "64d95ad8e4bbbd24c1606515",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "66449c6415d3ab68b373f5c4"
    //             ],
    //             "instructions": [
    //                 "[\"pc\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-02-01T13:23:10.671Z",
    //             "updatedAt": "2024-05-15T21:16:34.739Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65d86cfda7e92eafe46d9013",
    //             "courseName": "test",
    //             "courseDescription": "dsgdsf",
    //             "instructor": {
    //                 "_id": "65d86cd5a7e92eafe46d900c",
    //                 "firstName": "Abror",
    //                 "lastName": "Abdukayumov",
    //                 "email": "abrorkhandeveloper@gmail.com",
    //                 "password": "$2b$10$CZOQPjSGwoK9rR.3u2Al0.pGnY5Ef9sjbHG6hzMnt/D6/Jo8gncCa",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65d86cd5a7e92eafe46d900a",
    //                 "courses": [
    //                     "65d86cfda7e92eafe46d9013"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Abror Abdukayumov&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-02-23T10:00:53.336Z",
    //                 "updatedAt": "2024-02-23T10:01:33.667Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "sfdfsf",
    //             "courseContent": [
    //                 "65d86d07a7e92eafe46d9018",
    //                 "65d86d0ca7e92eafe46d901d"
    //             ],
    //             "ratingAndReviews": [
    //                 {
    //                     "_id": "65f3ecf155fbb78f3449ca81",
    //                     "user": "65f3eb1da640b186cf86ae95",
    //                     "rating": 1,
    //                     "review": "bad song",
    //                     "course": "65d86cfda7e92eafe46d9013",
    //                     "__v": 0
    //                 }
    //             ],
    //             "price": 3223,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1708682492/images/na8e36zh3z2ba9snn152.jpg",
    //             "tag": [
    //                 "[\"fff\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "65f3eb1da640b186cf86ae95"
    //             ],
    //             "instructions": [
    //                 "[\"Abror\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-02-23T10:01:33.657Z",
    //             "updatedAt": "2024-03-15T06:38:41.300Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65e82990f539eaebb38a933a",
    //             "courseName": "HTML & CSS",
    //             "courseDescription": "web data",
    //             "instructor": {
    //                 "_id": "65e2c21c398e1d0c3a01da04",
    //                 "firstName": "Aastha",
    //                 "lastName": "Shah",
    //                 "email": "aastha_20121@ldrp.ac.in",
    //                 "password": "$2b$10$NhijAWvnl5PUBm9ZKg5t6e7piEEHR55/hw.V.hHcDIh4tfA7S913.",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "65e2c21c398e1d0c3a01da02",
    //                 "courses": [
    //                     "65e80c99f51b299a2c820d81",
    //                     "65e823c9f634a8ee8df99617",
    //                     "65e82990f539eaebb38a933a",
    //                     "66272f1515d3ab68b37375dc",
    //                     "662730d315d3ab68b373761b",
    //                     "6627331c15d3ab68b3737643",
    //                     "662735a115d3ab68b373764e"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Aastha Shah&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-03-02T06:07:24.506Z",
    //                 "updatedAt": "2024-04-23T04:14:25.117Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "learn",
    //             "courseContent": [
    //                 "65e82999f539eaebb38a933f"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 1000,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1709713808/images/wc6wzzbetmmby0dw6x1p.png",
    //             "tag": [
    //                 "[\"web\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "649fe1f8b712a2ee0cd7a7c2"
    //             ],
    //             "instructions": [
    //                 "[\"nothing\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-03-06T08:30:08.513Z",
    //             "updatedAt": "2024-06-08T15:27:22.936Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6644c19115d3ab68b373f763",
    //             "courseName": "Basics of Web Dev",
    //             "courseDescription": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //             "instructor": {
    //                 "_id": "6644c0bb15d3ab68b373f75b",
    //                 "firstName": "Popo",
    //                 "lastName": "Bhatt",
    //                 "email": "chirantan.mazumdar.20@aot.edu.in",
    //                 "password": "$2b$10$JOaBxkHGCJrggyMYlH27FOk3oYj3fShktXdpeo5zvvF7dsjELuLpy",
    //                 "accountType": "Instructor",
    //                 "active": true,
    //                 "approved": true,
    //                 "additionalDetails": "6644c0bb15d3ab68b373f759",
    //                 "courses": [
    //                     "6644c19115d3ab68b373f763",
    //                     "6645111e15d3ab68b373fa76",
    //                     "665f422015d3ab68b3745cd0",
    //                     "665f481515d3ab68b3745d50"
    //                 ],
    //                 "image": "https://api.dicebear.com/6.x/initials/svg?seed=Popo Bhatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600",
    //                 "courseProgress": [],
    //                 "createdAt": "2024-05-15T14:03:39.523Z",
    //                 "updatedAt": "2024-06-04T17:00:05.494Z",
    //                 "__v": 0
    //             },
    //             "whatYouWillLearn": "Learn everything from scratch",
    //             "courseContent": [
    //                 "6644c19f15d3ab68b373f768"
    //             ],
    //             "ratingAndReviews": [],
    //             "price": 499,
    //             "thumbnail": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1715782032/images/y2s5t7r7ssexbb0jkmu2.png",
    //             "tag": [
    //                 "[\"Web development\"]"
    //             ],
    //             "category": "6475dbeb49dcc886b5698441",
    //             "studentsEnrolled": [
    //                 "66449c6415d3ab68b373f5c4",
    //                 "649fe1f8b712a2ee0cd7a7c2",
    //                 "665f3f2415d3ab68b3745b82"
    //             ],
    //             "instructions": [
    //                 "[\"NIL\"]"
    //             ],
    //             "status": "Published",
    //             "createdAt": "2024-05-15T14:07:13.053Z",
    //             "updatedAt": "2024-06-04T16:26:08.372Z",
    //             "__v": 0
    //         }
    //     ],
    //     "success": true
    // }

    // Memorize function to get CategoryId

    const getCategoryId = useMemo(() => async () => {
        try {
            const res = await fetchCourseCategories();
            const category = res?.find(category =>
                category.name.split(' ').join('-').toLowerCase() === catalogName);
            return category ? category._id : null;
        } catch (error) {
            toast.error('Failed to fetch categories');
            console.error('Error fetching categories:', error);
            return null;
        }
    }, [catalogName])

    // whenever a category is changed
    useEffect(() => {
        (async () => {
            const category_Id = await getCategoryId();
            setCategoryId(category_Id);

        })()
    }, [catalogName, getCategoryId])

    // whenever a new category is selected populate catalog with new data.
    useEffect(() => {
        const callGetCategoryDetails = async () => {
            if (!categoryId) return;

            const res = await getCategoriesPageData(categoryId);
            // includes:selectedCategory, differentCourses, mostSellingCourses
            setCatalogPageData(res?.data);
        }

        callGetCategoryDetails();
    }, [categoryId])

    return (
        <div>
            {/* HERO SECTION */}
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent" >
                    <p className="text-sm text-richblack-300">
                        <Link to={'/'}>Home </Link> / Catalog /
                        <span className="text-indigo-400">
                            {" " + catalogPageData?.selectedCategory?.name}
                        </span>
                    </p>

                    <p className="text-3xl text-richblack-5 font-mono">
                        {catalogPageData?.selectedCategory?.name}
                    </p>

                    <p className="max-w-[870px] text-richblack-200 italic">
                        {catalogPageData?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* SECTION 1 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <p className='section_heading'>Courses to get you started</p>

                {/* CLICKABLE TAB */}
                <div className='my-4 flex border-b border-b-richblack-600 text-sm cursor-pointer font-medium'>
                    <p
                        onClick={() => setActive(!active)}
                        className={`px-4 py-2 ${active ? 'border-b-2 border-b-indigo-600 text-indigo-400' : 'text-richblack-50'}`}
                    >
                        Most Popular
                    </p>

                    <p
                        onClick={() => setActive(!active)}
                        className={`px-4 py-2 ${!active ? 'border-b-2 border-b-indigo-600 text-indigo-400' : 'text-richblack-50'}`}
                    >
                        New
                    </p>
                </div>

                {/* COURSE SLIDER */}
                <div className=''>
                    <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
                </div>
            </div>

            {/* SECTION 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='section_heading bg-'>
                    Similar Courses in <span className='capitalize'>{catalogPageData?.selectedCategory?.name}</span>
                </p>

                {/* COURSE SLIDER */}
                <div>
                    <CourseSlider courses={catalogPageData?.differentCourses} />
                </div>
            </div>

            {/* SECTION 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='section_heading'>Fequently Bought</p>

                {/* CARDS */}
                <div>
                    <div className="py-8">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:mx-auto md:w-full max-w-max'>
                            {catalogPageData?.mostSellingCourses
                                ?.slice(0, 4)
                                .map(course => (
                                    <CourseCard key={course._id} course={course} Height={"h-[220px] lg:h-[280px]"} />
                                ))}

                        </div>

                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Catalog