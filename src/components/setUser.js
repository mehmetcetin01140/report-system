import React, { useEffect,useState } from 'react'
import Modal from "../components/Modal"
import axios from "axios"
import lockSolid from '../images/lock-solid.svg';
import lockOpenSolid from '../images/lock-open-solid.svg';
import userIcon from '../images/reporticon.svg';
export default function SetUser(props) {
const [userData,setUserData] = useState([])
const [selectedUser,setSelectedUser] = useState(props.userIdForSet)
const [userNameSurname,setUserNameSurname] = useState("")
const [userEmail,setEmail] = useState("")
const [userPassword,setUserPassword] = useState("")
const [isLocked,setIsLocked] = useState(true)
const isLockedWatcher = () =>{
  isLocked === true ? setIsLocked(false) : setIsLocked(true)  
}
const submitSetUser = () =>{
  const formData = new FormData()

    formData.append('user_namesurname',userData.userNameSurname)
    formData.append('user_mail',userData.userMail)
    formData.append('user_password',userData.userPassword)
    formData.append('id',userData.userId)
    formData.append('action','setUser')
    fetch(`${process.env.REACT_APP_ENDPOINT}`,{
      
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
    console.log(data);
    window.location.reload()
    })

}
  useEffect(()=>{
    const formData = new FormData()
    formData.append('user_mail',selectedUser)
    formData.append('action','getDataForSetUser')
   fetch(`${process.env.REACT_APP_ENDPOINT}`,{
     method: 'POST',
     body: formData
   })
   .then(res => res.json())
   .then(data => setUserData({
     userNameSurname:data[0].user_namesurname,
     userMail:data[0].user_mail,
     userPassword:data[0].user_password,
     userId:data[0].id
   }))
  },[])
  useEffect(()=>{
    if(!window.localStorage.getItem('isLoggedIn') || window.localStorage.getItem('isLoggedIn')==='false' || window.localStorage.getItem('isAdmin')!=='admin' ){
    props.history.push("/")
    }
   })

   return (
   
    <div className='setUserContainer'>
      <div className='userIcon'>
      <i class="fa-solid fa-user icon"></i>
      <span>Kullanıcı Düzenle</span>
      </div>
   <div className='tables setUser container-fluid '>
 <table className="ui very compact small table unstackable">
 <thead>
 <tr>
 <th>Ad Soyad</th>
 <th>Email</th>
 <th>Şifre</th>
 <th>Kilit</th>
 </tr></thead>
 <tbody> 
 <tr>
        <td><input type="text" readOnly={isLocked} value={userData.userNameSurname} onChange={e => setUserData({...userData,userNameSurname:e.target.value})}/></td>
         <td><input type="text" readOnly={isLocked} value={userData.userMail} onChange={e => setUserData({...userData,userMail:e.target.value})} /></td>
          <td><input type="text" readOnly={isLocked} value={userData.userPassword} onChange={e => setUserData({...userData,userPassword:e.target.value})} /></td>
           <td onClick={isLockedWatcher}><span className='isLocked'><img src={isLocked?lockSolid:lockOpenSolid} style={{width:15}} alt="" /></span></td>
           
    </tr>
 </tbody>
 </table>
 </div>
 <div className='setUserButton'>
 <button className='btn btn-success btn-sm' onClick={submitSetUser}>Güncelle</button>
 </div>
 </div>
)
}
