import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import UserSetModal from "./UserSetModal"
import { useEffect,useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '1px solid #10000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const [userData,setUserData] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deneme,setDeneme] = useState("")
  const deleteData = todoId =>{
    
    const formData = new FormData()
    formData.append('id',todoId)
    formData.append('action','delete-user')
   fetch(`${process.env.REACT_APP_ENDPOINT}`,{
     
     method: 'POST',
     body: formData
   })
   .then(res => res.json())
   .then(data => {
     if(data.error){
       alert(data.error)
     }
     else{
      setUserData(userData.filter(todo=>todo.id !== todoId))
    
     }
   })
  }
  useEffect(()=>{
    const formData = new FormData()
    formData.append('action','getAllData')
   fetch(`${process.env.REACT_APP_ENDPOINT}`,{
     method: 'POST',
     body: formData
   })
   .then(res => res.json())
   .then(data => setUserData(data.userData))
  },[])

  return (
    <div >
      <Button onClick={handleOpen} className="ui button smallButtons usersButton"><span>Kullanıcılar</span></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='modalDiv container'>
            <div className='usersArea'>
              <div className='fontArea'>
            <i class="fa-solid fa-users usersFont"></i>
              </div>
              <div className='titleArea'>
            <span>Kullanıcı Listesi</span>
            <hr />
              </div>
            </div>
            {userData.map(user=>(
           <ul className='modalUl'>
               <li className='mt-3'><span className="modalUserName">{user.user_namesurname}</span><div className='modalList'><span onClick={()=> setDeneme(user.user_mail)}><UserSetModal userId={deneme} /></span>
               <button className='btn btn-danger btn-sm deleteUserButton' onClick={()=>deleteData(user.id)}>Sil</button></div></li> 
               <hr/>
           </ul>
            ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}