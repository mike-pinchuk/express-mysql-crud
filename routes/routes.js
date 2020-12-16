const { Router } = require('express')
const db = require('../models/db')
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello')
})

router.get('/learners', (req, res) => {
    db.query('SELECT * FROM learnerdetails', (err, data, fields) => {
        if (err) {
            console.error(err)
        } else {
            res.send(data)
        }

    })
})

router.get('/learners/:id', (req, res) => {
    db.query('SELECT * FROM learnerdetails WHERE learner_id = ?', [req.params.id], (err, data, fields) => {
        if (err) {
            console.error(err)
            return
        } else {
            res.send(data)
        }
    })
})

router.post('/learners', (req, res) => {
    const learner = req.body;

    const sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?;CALL new_procedure(@learner_id,@learner_name,@learner_email,@course_Id);";
    db.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, data, fields) => {
        if (!err) {
            db.query('SELECT * FROM learnerdetails WHERE learner_email = ?', [learner.learner_email], (errIn, dataIn) => {
                if(errIn) {
                    console.log(errIn)
                    return res.status(500).send('Something wrong')
                } 
                res.json(dataIn)
            })   
        } else {
            console.log(err)
            res.status(500).send('Something wrong!')
        }
    })
})

router.put('/learners', (req, res) => {
    const learner = req.body;

    const sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?;CALL new_procedure(@learner_id,@learner_name,@learner_email,@course_Id);";
    db.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send('Something wrong!')
        }
        res.send('Learner details was updated successfully')
    })
})

router.delete('/learners/:id', (req, res) => {
    db.query('DELETE FROM learnerdetails WHERE learner_id = ?', [req.params.id], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send('Something wrong!')
        }
        res.status(200).send('Learner was deleted successfully')
    })
})



module.exports = router;

