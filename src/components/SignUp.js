import React, { useState,useEffect } from 'react'
import '../style/style.scss'
import axios from "axios"
// Burada inputları state e bağlayıp verileri postDatada topladım ve postFuncla göndermeye hazır hale getirdim sadece database bağlantısı kurulacak
export default function SignUp(props) {
  const [nameSurname,setNameSurname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isMailExist,setEmailExist] = useState("")
  const addUser = (e) =>{
    e.preventDefault()
    const formData = new FormData()

      formData.append('user_namesurname',nameSurname)
      formData.append('user_mail',email)
      formData.append('user_password',password)
      formData.append('action','signUp')
      fetch(`${process.env.REACT_APP_ENDPOINT}`,{
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        setEmailExist(data)
        if(data==="Kayıt Başarıyla Tamamlandı."){
          props.history.push("/")
        }
      })
   
  }
  useEffect(()=>{
    if(window.localStorage.getItem('isLoggedIn')==='true'){
    props.history.push("/isgonder")
    }
   })
  
  return (
 <div className='signUp'>
   <div className="container">
  <div className="left">
    <div className="header">
      <h2 className="animation a1">Üye Ol</h2>
      <h4 className="animation a2"></h4>
    </div>
    <div>
<form className="form">
    <input type="text" className="form-field animation a3" placeholder="Ad Soyad" name='namesurname' onChange={(event)=>setNameSurname(event.target.value)} value={nameSurname} required/>
      <input type="email" className="form-field animation a3" placeholder="Email Adresi" name='email'onChange={(event)=>setEmail(event.target.value)} value={email} required/>
      <input type="password" className="form-field animation a4" placeholder="Şifre" name='password' onChange={(event)=>setPassword(event.target.value)} value={password} required/>
      <span style={{color:'red'}}>{isMailExist}</span>
      <button className="animation a6 signUpButton" onClick={addUser}><span>Üye Ol</span></button>
   
    </form>
    </div>
  </div>
  
  <div className="right"></div>
</div>

 </div>


  )
}
