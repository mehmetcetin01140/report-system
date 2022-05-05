import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
function Message(props) {
const [chatData,setChatData] = useState([])
const [textHolder,setTextHolder] = useState("")
const getName =window.localStorage.getItem('nameSurname')
const sendMessage = () =>{
    const formData = new FormData()
    formData.append('sender',getName)
    formData.append('chatLogs',textHolder)
    formData.append('action','sendChatData')
    fetch(`${process.env.REACT_APP_ENDPOINT}`,{
      
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert("data error")
      }
    })
 
}
const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
        sendMessage()
      }
}

    useEffect(()=>{
        setInterval(() => {
            const formData = new FormData()
            formData.append('action','getChatData')
           fetch(`${process.env.REACT_APP_ENDPOINT}`,{
             method: 'POST',
             body: formData
           })
           .then(res => res.json())
           .then(data => setChatData(data))
        }, 1000);

      },[])
     
      useEffect(() => {
        let getData=window.localStorage.getItem('isLoggedIn');
          if(getData==="false" || getData ===null){
              props.history.push("/")
          }
      });
     
    
  return (
    <div class="messageArea">
    <div class="card mx-auto bgChat" >
        <div class="card-header bg-transparent ">
            <div class="navbar navbar-expand p-0">
                <ul class="navbar-nav me-auto align-items-center">
                    <li class="nav-item">
                    </li>
                    <li class="nav-item">
                      <span><strong>Chat Odası</strong></span>
                    </li>
                    
                </ul>
             
            
            </div>
        </div>
        <div class="card-body container p-4" >

               {chatData.map((data,index)=>(
            <div class={index%2===0 ? "d-flex align-items-baseline mb-4" : "d-flex justify-content-end text-end"}>
               {/* sol taraf */}
                    <div class={data.sender.includes('m') || data.sender.includes('k') ?"position-relative avatar border border-primary bg-dark":"position-relative avatar border border-secondary bg-info"}>
                   <span className='d-flex justify-content-center avatarText text-white'><strong>{data.sender.charAt(0).toUpperCase()}{data.sender.split(" ").pop().charAt(0).toUpperCase()}</strong></span>
                   
                </div>
                <div class="pe-2" id="dene">
                    <div>
                        <div class="card card-text d-inline-block p-2 px-3 m-1 senderArea">
                         <span className='chatLog'>{data.chatLogs}</span>
                        </div>
                    </div>
                    <div>
                        <div class="small ">{data.sender}</div>
                      
                    </div>
                </div>
            
            </div>
               ))}
{/* justify-content-end text-end
        sağ taraf */}
        </div>
        <div class="card-footer bg-white chatInputArea w-100 bottom-0 m-0 p-0">
            <div class="input-group">
                <input type="text" class="form-control border-0 " value={textHolder} onChange={(e)=>setTextHolder(e.target.value)} onKeyPress={handleKeyPress}  placeholder="Mesaj gönder..."/>
            </div>
        </div>
    </div>
</div>
  )
}
export default withRouter((Message))