const getStudents = 'select * from students';
const getStudentById = 'select * from students where id = $1'
const checkEmail = 'select * from students where email = $1'
const addStudent = 'insert into students (name, email, age, dob) values ($1, $2, $3, $4)'
const deleteStudent = 'delete from students where id = $1'
const updateStudent = 'update students set name = $1, email = $2, age = $3, dob = $4 where id = $5'

const getUser = 'select * from users where id = $1'
const updateUserNoImage = 'UPDATE users SET name = $1, age = $2 WHERE id = $3'
const updateUserWithImage = 'UPDATE users SET name = $1, age = $2, img_url = $3 WHERE id = $4'


module.exports = {
    getStudents,
    getStudentById,
    checkEmail,
    addStudent,
    deleteStudent,
    updateStudent,
    getUser,
    updateUserNoImage,
    updateUserWithImage
}