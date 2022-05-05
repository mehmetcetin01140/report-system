import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../style/style.scss'
import axios from "axios"
 function Login(props) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [passCheck,setPassCheck] = useState("")
  const login = () =>{
    const formData = new FormData()
      formData.append('user_mail',email)
      formData.append('user_password',password)
      formData.append('action','login')
      fetch(`${process.env.REACT_APP_ENDPOINT}`,{
        method: 'POST',
        body: formData,
        credentials:'same-origin'
      })
      .then(res => res.json())
      .then(data=>window.localStorage.setItem('mailData',data.mail)
      +window.localStorage.setItem('passData',data.pass)+window.localStorage.setItem("isLoggedIn",data.loginCheck)
      )
     setTimeout(() => {
      if(window.localStorage.getItem('isLoggedIn')==="true"){
        props.history.push("/isgonder")
          window.location.reload();
        }
          else {
          setPassCheck('Lütfen email adresinizi ve şifrenizi kontrol edin.')
        }
     }, 500);

  }

  useEffect(()=>{
    if(window.localStorage.getItem('isLoggedIn')==="true"){
    props.history.push("/isgonder")
    }
   })


  return (
 <div className='signUp'>
   <div className="container">
  <div className="left">
    <div className="header">
      <h2 className="animation a1">Hoş Geldiniz</h2>
      <h4 className="animation a2">Lütfen giriş yapın.</h4>
    </div>
    <div className="form">
      <input type="email" className="form-field animation a3" placeholder="Email Adresi" onChange={(event)=>setEmail(event.target.value)} value={email} required/>
      <input type="password" className="form-field animation a4" placeholder="Şifre" onChange={(event)=>setPassword(event.target.value)} value={password} required/>
      <span style={{color: "red"}}>{passCheck}</span>
   
      <button className="animation a6" onClick={login}><span>Giriş Yap</span></button>
    
    </div>
  </div>
  <div className="right"></div>
</div>
 </div>


  )
}
export default withRouter((Login))