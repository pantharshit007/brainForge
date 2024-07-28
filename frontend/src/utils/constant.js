export const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
}

export const USER_ROLE = {
    ALL: "Everyone",
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
}

export const COURSE_STATUS = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
}

export const COURSE_COMPLETION_STATUS = {
    ALL: "All",
    PENDING: "Pending",
    COMPLETED: "Completed",
}

export const toastPosition = { position: "top-right" }

export const errorToastPosition = {
    position: "bottom-right", style: {
        border: '2px solid #bd1518',
        backgroundColor: "#362f2f",
        color: "white",
    },
}
