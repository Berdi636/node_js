const multer = require('multer')
const pool = require('../../db')
const queries = require('./queries')
const fs = require('fs')





const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    pool.query(queries.checkEmail, [email], (error, results) => {
        if (results.rows.length) {
            res.send('Email exists')
        } else {
            pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
                if (error) throw error
            res.send('Student created successfully!')
            })
        }
    })
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query(queries.getStudentById, [id], (error,results) => {
        const notFoundStudent = !results.rows.length
        if (notFoundStudent) {
            res.send(`Student with ${id} doesn't exist!`)
        } else {
            pool.query(queries.deleteStudent, [id], (error, results) => {
                if (error) throw error
                res.send('Student deleted successfully!')
            })
        }
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email, age, dob } = req.body
    
    pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
        if (error) throw error
        res.status(200).send(`Student with ID ${id} was updated!`)
    })  
}

const getUser = (req, res) => {

    const id = req.params.id

    pool.query(queries.getUser, [id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const updateUser = (req, res) => {

    const id = req.params.id
    const { name, age, img_url } = req.body
    const files = req.files
    const oldImage = img_url.split('/')
    
    if (files.length === 0) {
        pool.query(queries.updateUserNoImage, [name, age, id], (error, results) => {
            if (error) throw error
            res.status(200).send(`Student with ID ${id} was updated!`)
        })
    } else {
        const img_name = 'localhost:3000/users/image_' + files[0].originalname
        fs.unlinkSync(`src/static/${oldImage[2]}`)
        pool.query(queries.updateUserWithImage, [name, age, img_name, id], (error, results) => {
            if (error) throw error
            res.status(200).send(`Student with ID ${id} was updated!`)
        })
    }

}




module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent,
    getUser,
    updateUser
}
