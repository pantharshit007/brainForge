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