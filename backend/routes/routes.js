const express = require('express')
const router = express.Router()

const {createAccount, loginAccount, userProfile} = require('../controllers/userAccount')
const {addNote, viewAllNote, editNote, deleteNote, updatePinnedNote, searchNote} = require('../controllers/notes')
const {authenticateToken} = require('../utilities')

router.post('/signup', createAccount)
router.post('/login', loginAccount)
router.get('/profile', authenticateToken, userProfile)

router.post('/add', authenticateToken, addNote)
router.get('/view', authenticateToken, viewAllNote)

router.get('/search', authenticateToken, searchNote)

router.put('/update/:noteId', authenticateToken, editNote)
router.delete('/delete/:noteId', authenticateToken, deleteNote)

router.put('/update-pinned/:noteId', authenticateToken, updatePinnedNote)

module.exports = router