export const BASE = "http://localhost:52940";

export const LOGIN = `${BASE}/token`;
export const REGISTER = `${BASE}/api/account/register`;

//users
export const ADMINS = `${BASE}/api/admins/`;
export const GETTEACHERS = `${BASE}/api/teachers`;
export const GETSTUDENTS = `${BASE}/api/students`;
export const GETPARENTS = `${BASE}/api/parents`;

//
export const SCHOOLYEARS = `${BASE}/api/schoolyear`;
export const SCHOOLCLASS = `${BASE}/api/schoolclass`;
export const COURSES = `${BASE}/api/courses`;
export const SUBJECTS = `${BASE}/api/subjects`;

export const TEACHER = `${BASE}/api/gradebook/teacher/`;
export const STUDENT = `${BASE}/api/gradebook/student/`;
export const PARENT = `${BASE}/api/gradebook/parent/`;

export const STUDENTCOURSES = `${BASE}/api/studentcourse/`;

// export function call(url, method, body) {
//   const requestOptions = {
//     method,
//     headers: {
//       Authorization: "Bearer  " + localStorage.getItem("token")
//     },
//     body: JSON.stringify(body)
//   };

//   return fetch(url, requestOptions);
// }
