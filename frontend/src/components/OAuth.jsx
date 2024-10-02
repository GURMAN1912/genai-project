import React from 'react'
import{getAuth, GoogleAuthProvider, signInWithPopup} from'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () =>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      try {
          const resultsFromGoogle = await signInWithPopup(auth, provider)
          console.log(resultsFromGoogle)
          const res = await axios.post('/auth/google', {
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            profilePicture: resultsFromGoogle.user.photoURL,
            gender: resultsFromGoogle.genders ? userInfo.genders[0].value : 'Not specified',
            age: resultsFromGoogle.birthdays ? calculateAge(userInfo.birthdays[0].date) : 0,
          },{withCredentials:true});
          if (res.status === 200) {
            toast.success('Sign in successful!');
            dispatch(signInSuccess(res.data ));
            navigate('/');
          }
      } catch (error) {
          console.log(error);
      }
  } 
  return (
    <button onClick={handleClick} type='button' className=' items-center bg-[#012f2c] text-white p-2 rounded-lg'>
      Continue with Google
    </button>
  )
}