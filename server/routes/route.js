import express from 'express'
import {signupUser, loginUser, verifyEmail}  from '../controller/user-controller.js';
import { shortenUrl,getOriginalUrl,editUrl,deleteUrl,getShortUrl, incrementClicks } from '../controller/UrlController.js';
const router = express.Router()

router.post('/signup', signupUser)
router.post('/emailVerify', verifyEmail)
router.post('/login', loginUser)

router.post('/shorten', shortenUrl);
router.get('/original/:_id/:shortUrl', getOriginalUrl);
router.get('/getShortURL/:_id', getShortUrl); // Assuming you pass the userId as a parameter
router.put('/edit', editUrl);
router.put('/clicks/increment/:shortUrl', incrementClicks);
router.delete('/delete/:_id/:shortUrl', deleteUrl);
export default router;