const { Router } = require('express');
const router = Router();
const controller = require('./controller')
const multer = require('multer')


const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, 'src/static')
    },
    filename: function(req, file, cb) {
        cb(null, 'image_' + file.originalname)
    }
 })

 const isFile = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        return cb(null, true)
    }else {
        return cb(new Error('Only image files allowed!'))
    }
}


const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: isFile
}).array('files')


function Upload(req, res, next) {
    upload(req, res, err => {

        if(err instanceof multer.MulterError){
            return res.status(400).send(err.message)

        }else if(err){
            return res.status(400).send(err.message)

        }
        
        next()
    })
}



router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.delete('/:id', controller.deleteStudent)
router.put('/:id', controller.updateStudent)
router.get('/:id', controller.getStudentById)


///////////// IMAGE UPDATE ROUTERS //////////////////
router.get('/profile/update/:id', controller.getUser)
router.post('/profile/update/:id', Upload, controller.updateUser)


router.post('/upload', Upload, (req, res) => {
    
    res.send('files recieved!')

 })

module.exports = router;
