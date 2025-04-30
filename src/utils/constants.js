export const BASE_URL = window.location.hostname === 'localhost' 
    ? "http://localhost:7777/api" 
    : "https://quiz-app-server-5u1d.onrender.com/api";

export const REGISTER_USER = `${BASE_URL}/users/register`;
export const LOGIN_USER = `${BASE_URL}/users/login`;
export const LOGOUT_USER = `${BASE_URL}/users/logout`;
export const GET_USER_DETAILS = `${BASE_URL}/users/user`;

export const GET_ALL_EXAMS = `${BASE_URL}/exams/get-all-exams`;
export const ADD_EXAM = `${BASE_URL}/exams/add-exam`;
export const EDIT_EXAM = `${BASE_URL}/exams/edit-exam/`;
export const DELETE_EXAM = `${BASE_URL}/exams/delete-exam/`;

export const GET_ALL_QUESTIONS = `${BASE_URL}/exams/get-all-questions`;
export const ADD_QUESTION = `${BASE_URL}/exams/add-question`;
export const EDIT_QUESTION = `${BASE_URL}/exams/edit-question/`;
export const DELETE_QUESTION = `${BASE_URL}/exams/delete-question/`;

export const ADD_REPORT = `${BASE_URL}/reports/addReport`;
export const GET_ALL_REPORTS = `${BASE_URL}/reports/getAllReports`;
export const GET_REPORT_BY_USER_ID = `${BASE_URL}/reports/getReportByUserId`;
export const GET_ALL_REPORTS_WITH_SEARCH = `${BASE_URL}/reports/getAllReportsWithSearch`;

export const GET_USER_PROFILE = `${BASE_URL}/users/user/profile`;
export const UPDATE_USER_PROFILE = `${BASE_URL}/users/user/edit-profile`;


// APP CONSTANTS

// PROTECTED ROUTES
export const APP_NAME = "Quiz App";

// QUESTION MODEL
export const QUESTION_MODEL = {
    QUESTION: "Question",
    QUESTION_PLACEHOLDER: "Enter Question",
    ANSWER: "Answer",
    ANSWER_PLACEHOLDER: "Enter Answer",
    EXPLANATION: "Explanation",
    EXPLANATION_PLACEHOLDER: "Enter Explanation",
    OPTIONS: "Options",
    FORM_MESSAGE: {
        QUESTION: "Question is required",
        ANSWER: "Answer is required",
        EXPLANATION: "Explanation is required",
    },
    OPTIONS_PLACEHOLDER: {
        OPTION_1: "Enter Option 1",
        OPTION_2: "Enter Option 2",
        OPTION_3: "Enter Option 3",
        OPTION_4: "Enter Option 4",
    },
    OPTIONS_MESSAGE: {
        OPTION_1: "Option 1 is required",
        OPTION_2: "Option 2 is required",
        OPTION_3: "Option 3 is required",
        OPTION_4: "Option 4 is required",
    },
    SAVE_BUTTON: "Save",
    UPDATE_BUTTON: "Update",
    CANCEL_BUTTON: "Cancel",
}

export const TOAST_MESSAGES = {
    LOADING: "Loading...",
    UPDATING_EXAM: "Updating Exam...",
    ADDING_EXAM: "Adding Exam...",
    UPDATING_QUESTION: "Updating Question...",
    ADDING_QUESTION: "Adding Question...",
    LOGGING_IN: "Logging in...",
}

export const ADMIN_REPORTS = {
    COLUMNS: {
        EXAM_NAME: "Exam Name",
        USER_NAME: "User Name",
        CATEGORY: "Category",
        DATE: "Date",
        TOTAL_MARKS: "Total Marks",
        MARKS_OBTAINED: "Marks Obtained",
        VERDICT: "Verdict",
    },
    PAGE_TITLE: "Admin Reports",
    SEARCH_PLACEHOLDER: {
        EXAM: "Search by exam",
        USER: "Search by user",
    },
    SEARCH_BUTTON: "Search",
}

export const ADD_EDIT_EXAM = {
    PAGE_TITLE_ADD: "Add Exam",
    PAGE_TITLE_EDIT: "Edit Exam",
    TABS: {
        EXAM_DETAILS: "Exam Details",
        QUESTIONS: "Questions",
    },
    FORM_LABELS: {
        EXAM_NAME: "Exam Name",
        EXAM_DURATION: "Exam Duration",
        EXAM_CATEGORY: "Category",
        TOTAL_MARKS: "Total Marks",
        PASSING_MARKS: "Passing Marks",
    },
    FORM_PLACEHOLDERS: {
        EXAM_NAME: "Enter Exam Name",
        EXAM_DURATION: "Enter Exam Duration",
        EXAM_CATEGORY: "Select Category",
        TOTAL_MARKS: "Enter Total Marks",
        PASSING_MARKS: "Enter Passing Marks",
    },
    CATEGORY_LABELS: {
        JAVASCRIPT: "Javascript",
        REACT: "React",
        NODE: "Node",
        MONGO: "MongoDB",
        PYTHON: "Python",
    },
    FORM_BUTTONS: {
        ADD_EXAM: "Add Exam",
        UPDATE_EXAM: "Update Exam",
    },
    QUESTIONS_TAB: {
        ADD_QUESTION: "Add Question",
        UPDATE_QUESTION: "Update Question",
    },
    QUESTIONS: "Questions",
    QUESTION_MODEL: {
        QUESTION: "Question",
        OPTIONS: "Options",
        ANSWER: "Answer",
        EXPLANATION: "Explanation",
    },
    BUTTONS: {
        EDIT: "Edit",
        DELETE: "Delete",
    }
}

export const ADMIN_EXAMS = {
    COLUMNS: {
        EXAM_NAME: "Exam Name",
        EXAM_DURATION: "Exam Duration",
        EXAM_CATEGORY: "Category",
        PASSING_MARKS: "Passing Marks",
        TOTAL_MARKS: "Total Marks",
        ACTIONS: "Actions",
    },
    PAGE_TITLE: "Exams",
    BUTTONS: {
        EDIT: "Edit",
        DELETE: "Delete",
        ADD_EXAM: "Add Exam",
    }
}

export const HOME = {
    WELCOME_MESSAGE: "Welcome",
    EXAM_CARD: {
        EXAM_NAME: "Exam Name",
        EXAM_DURATION: "Exam Duration",
        EXAM_CATEGORY: "Category",
        TOTAL_QUESTIONS: "Total Questions",
        TOTAL_MARKS: "Total Marks",
        PASSING_MARKS: "Passing Marks",
        CREATED_AT: "Created At",
        UPDATED_AT: "Updated At",
    },
    BUTTONS: {
        START_EXAM: "Start Exam",
    }
}

export const LOGIN = {
    PAGE_TITLE: "Login",
    FORM_LABELS: {
        EMAIL: "Email",
        PASSWORD: "Password",
    },
    FORM_PLACEHOLDERS: {
        EMAIL: "Enter your email",
        PASSWORD: "Enter your password",
    },
    FORM_BUTTONS: {
        LOGIN: "Login",
    },
    LINK: {
        NEW_USER: "New User? Register",
    }
}

export const PROFILE = {
    PAGE_TITLE: "Profile",
    FORM_LABELS: {
        NAME: "Name",
        EMAIL: "Email",
    },
    FORM_PLACEHOLDERS: {
        NAME: "Enter your name",
        EMAIL: "Enter your email",
    },
    FORM_BUTTONS: {
        EDIT_NAME: "Edit Name",
        EDIT_EMAIL: "Edit Email",
    },
    BUTTONS: {
        SAVE: "Save",
    }
}

export const REGISTER = {
    PAGE_TITLE: "Register",
    FORM_LABELS: {
        NAME: "Name",
        EMAIL: "Email",
        PASSWORD: "Password",
    },
    FORM_PLACEHOLDERS: {
        NAME: "Enter your name",
        EMAIL: "Enter your email",
        PASSWORD: "Enter your password",
    },
    FORM_BUTTONS: {
        REGISTER: "Register",
    },
    LINK: {
        ALREADY_HAVE_ACCOUNT: "Already have an account? Login",
    }
}

export const USER_REPORTS = {
    PAGE_TITLE: "Reports",
    COLUMNS: {
        EXAM_NAME: "Exam Name",
        USER_NAME: "User Name",
        CATEGORY: "Category",
        DATE: "Date",
        TOTAL_MARKS: "Total Marks",
        MARKS_OBTAINED: "Marks Obtained",
        VERDICT: "Verdict",
    },
}

export const USER_WRITE_EXAM = {
    VERDICT: {
        PASS: "Pass",
        FAIL: "Fail",
    },
}

export const USER_WRITE_EXAM_INSTRUCTION = {
    PAGE_TITLE: "Instruction",
    INSTRUCTIONS: {
        READ_INSTRUCTIONS: "Read the instructions carefully",
        MAKE_SURE_UNDERSTAND: "Make sure you understand the instructions before starting the exam.",
        EXAM_WILL_BE_CONDUCTED: "The exam will be conducted on the basis of the questions given in the exam.",
        EXAM_MUST_BE_COMPLETED: "Exam must be completed in {exam.duration} minutes.",
        EXAM_WILL_BE_SUBMITTED_AUTOMATICALLY: "Exam will be submitted automatically after {exam.duration} minutes.",
        YOU_CANNOT_SUBMIT_THE_EXAM_ONCE_IT_IS_STARTED: "You can not submit the exam once it is started.",
        DO_NOT_REFRESH_THE_PAGE: "Do not refresh the page.",
        DO_NOT_CLOSE_THE_TAB: "Do not close the tab.",
        DO_NOT_USE_ANY_EXTERNAL_RESOURCES: "Do not use any external resources.",
        YOU_CAN_USE_THE_PREVIOUS_AND_NEXT_BUTTON_TO_NAVIGATE_THROUGH_THE_QUESTIONS: "You can use the previous and next button to navigate through the questions.",
        YOU_CANNOT_GO_BACK_TO_THE_PREVIOUS_QUESTION_ONCE_YOU_HAVE_SUBMITTED_THE_EXAM: "You can not go back to the previous question once you have submitted the exam.",
        TOTAL_NUMBER_OF_QUESTIONS_ARE: "Total number of questions are {exam?.questions?.length}.",
        EACH_QUESTION_CARRY_2_MARKS: "Each question carries 2 marks.",
        TOTAL_MARKS_ARE: "Total marks are {exam?.questions?.length * 2}.",
    },
    DECLARATION: "I agree to the above instructions and want to start the exam.",
    BUTTONS: {
        START_EXAM: "Start Exam",
    }
}

export const QUESTION = {
    BUTTONS: {
        PREVIOUS: "Previous",
        NEXT: "Next",
        SUBMIT: "Submit",
    },
    PROGRESS: "Question {selectedQuestion + 1} of {exam?.questions?.length}",
}

export const USER_WRITE_EXAM_RESULT = {
    VERDICT: {
        PASS: "Pass",
        FAIL: "Fail",
        SUCCESS: "Success",
        EXCEPTION: "Exception",
    },
    VERDICT_MESSAGE: {
        PASS: "Congratulations! 🎉",
        FAIL: "Better Luck Next Time! 😊",
    },
    RESULT: {
        TOTAL_MARKS: "Total Marks",
        PASS_PERCENTAGE: "Pass Percentage 50%",
        MARKS_OBTAINED: "Marks Obtained",
        WRONG_ANSWERS: "Wrong Answers",
        UNATTEMPTED: "Unattempted",
    },
    BUTTONS: {
        TRY_AGAIN: "Try Again",
    }
}


export const ROUTES = {
    COMMON: {
        LOGIN: "/login",
        REGISTER: "/register",
    },
    PROTECTED: {
        USER: {
            HOME: "/home",
            REPORTS: "/user/reports",
            WRITE_EXAM: "/user/write-exam/:id",
            PROFILE: "/user/profile",
        },
        ADMIN: {
            EXAMS: "/admin/exams",
            ADD_EXAM: "/admin/exams/add",
            EDIT_EXAM: "/admin/exams/edit/:id",
            REPORTS: "/admin/reports",
            PROFILE: "/admin/profile",
        }
    }
}