const Course = require('../model/Course')
const Teacher = require('../model/Teacher')
const Enrollment = require('../model/Enrollment')
const AppError = require('../utils/AppError')

const createCourse = async (courseData) => {
    const { courseCode } = courseData

    const existingCourse = await Course.findOne({ courseCode })

    if (existingCourse) {
        throw new AppError('Course code already exists', 409)
    }

    const course = await Course.create(courseData)

    return course
}

const getCourses = async () => {
    const courses = await Course.find()

    return courses
}

const getCourseById = async (courseId) => {
    const course = await Course.findById(courseId)

    if (!course) {
        throw new AppError('Course not found', 404)
    }

    return course
}

const updateCourse = async (courseId, courseData) => {
    const course = await Course.findById(courseId)
    
    if (!course) {
        throw new AppError('Course not found', 404)
    }

    Object.assign(course, courseData)

    await course.save()

    return course
}

const deleteCourse = async (courseId) => {
    const course = await Course.findById(courseId)

    if (!course) {
        throw new AppError('Course not found', 404);
        
    }

    const assignedTeacher = await Teacher.findOne({
        course: courseId
    })

    if (assignedTeacher) {
        throw new AppError('Cannot delete course because teachers are assigned to it', 409)
    }

    await course.deleteOne()

    return course
}

const getTeachersByCourse = async (courseId) => {
    await getCourseById(courseId)

    const teachers = await Teacher.find({ course: courseId })

    return teachers
}

const getStudentsByCourse = async (courseId) => {
    await getCourseById(courseId)

    const enrollments = await Enrollment.find({ course: courseId }).populate('student', 'firstName lastName')

    return enrollments
}

const getCourseMembers = async (courseId) => {
    const course = await getCourseById(courseId)
    const [teachers, enrollments] = await Promise.all([
        getTeachersByCourse(courseId),
        getStudentsByCourse(courseId)
    ])

    return {
        course: {
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName
        },
        teachers,
        students: enrollments
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getTeachersByCourse,
    getStudentsByCourse,
    getCourseMembers
}