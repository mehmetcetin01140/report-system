
import React, {  useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert"
import DatePicker from 'react-date-picker';
import Warning from "./Warning"
import Error from "./Error"
import { withRouter } from 'react-router-dom';

function Userpanel(props) {
 
    const [toDo,setTodo]=useState("")
    const [toDo1,setTodo1]=useState("")
    const [toDo2,setTodo2]=useState("")
    const [toDo3,setTodo3]=useState("")
    const [toDo4,setTodo4]=useState("")
    const [toDo5,setTodo5]=useState("")
    const [toDo6,setTodo6]=useState("")
    const [toDo7,setTodo7]=useState("")
    const [value, setValue] = useState(new Date());
    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
    const [value3, setValue3] = useState(new Date());
    const [value4, setValue4] = useState(new Date());
    const [value5, setValue5] = useState(new Date());
    const [value6, setValue6] = useState(new Date());
    const [value7, setValue7] = useState(new Date());
    const [value8, setValue8] = useState(new Date());
    const [value9, setValue9] = useState(new Date());
    const [value10, setValue10] = useState(new Date());
    const [value11, setValue11] = useState(new Date());
    const [value12, setValue12] = useState(new Date());
    const [value13, setValue13] = useState(new Date());
    const [value14, setValue14] = useState(new Date());
    const [value15, setValue15] = useState(new Date());
    const [totalTime,setTotalTime] = useState(Number(""))
    const [totalTime1,setTotalTime1] = useState(Number(""))
    const [totalTime2,setTotalTime2] = useState(Number(""))
    const [totalTime3,setTotalTime3] = useState(Number(""))
    const [totalTime4,setTotalTime4] = useState(Number(""))
    const [totalTime5,setTotalTime5] = useState(Number(""))
    const [totalTime6,setTotalTime6] = useState(Number(""))
    const [totalTime7,setTotalTime7] = useState(Number(""))
    const [isCompleted,setIsCompleted] = useState(false)
    const [errorCheck,setErrorCheck] = useState(false)
    const [emailData,setEmailData] = useState([])
    const [checker,setChecker] = useState(false)
    const weekday = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
    const d = new Date();
    let day = weekday[d.getDay()];
    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();
    const valuesObject = [
      {toDos:toDo,setTodos:setTodo,valueData:value,valueDataSet:setValue,valueDataRight:value1,valueDataSetRight:setValue1,totalTimes:totalTime,setTotalTimes:setTotalTime},{toDos:toDo1,setTodos:setTodo1,valueData:value2,valueDataSet:setValue2,valueDataRight:value3,valueDataSetRight:setValue3,totalTimes:totalTime1,setTotalTimes:setTotalTime1},{toDos:toDo2,setTodos:setTodo2,valueData:value4,valueDataSet:setValue4,valueDataRight:value5,valueDataSetRight:setValue5,totalTimes:totalTime2,setTotalTimes:setTotalTime2},{toDos:toDo3,setTodos:setTodo3,valueData:value6,valueDataSet:setValue6,valueDataRight:value7,valueDataSetRight:setValue7,totalTimes:totalTime3,setTotalTimes:setTotalTime3},{toDos:toDo4,setTodos:setTodo4,valueData:value8,valueDataSet:setValue8,valueDataRight:value9,valueDataSetRight:setValue9,totalTimes:totalTime4,setTotalTimes:setTotalTime4},{toDos:toDo5,setTodos:setTodo5,valueData:value10,valueDataSet:setValue10,valueDataRight:value11,valueDataSetRight:setValue11,totalTimes:totalTime5,setTotalTimes:setTotalTime5},{toDos:toDo6,setTodos:setTodo6,valueData:value12,valueDataSet:setValue12,valueDataRight:value13,valueDataSetRight:setValue13,totalTimes:totalTime6,setTotalTimes:setTotalTime6},{toDos:toDo7,setTodos:setTodo7,valueData:value14,valueDataSet:setValue14,valueDataRight:value15,valueDataSetRight:setValue15,totalTimes:totalTime7,setTotalTimes:setTotalTime7}]

    let sendDatas = valuesObject.filter(filt=>filt.toDos.length>0)
    const getUserName = () =>{
      let email = window.localStorage.getItem("mailData");
      const formData = new FormData()
      formData.append('user_mail',email)
      formData.append('action','getDataForSetUser')
     fetch(`${process.env.REACT_APP_ENDPOINT}`,{
       method: 'POST',
       body: formData
     })
     .then(res => res.json())
     .then(data => setEmailData(data[0].user_namesurname)+window.localStorage.setItem('nameSurname',data[0].user_namesurname))

    }
    const alertFunc = () =>{
      window.scrollTo(0, document.body.scrollHeight);
      return(
        <div className='alert'>
        <Alert variant="filled" severity="error">
        Yalnızca 24 saat aralığında rapor gönderebilirsiniz.
    </Alert>
        </div>
      )
    }
    const addTodo = () =>{
  if(sendDatas.length===0){
    setErrorCheck(true)
  }
      sendDatas.forEach(element => {
        let valueDataDate = (new Date(element.valueData).getDate())
        let valueDataRightDate = (new Date(element.valueDataRight).getDate())
        let valueDataMonth = (new Date(element.valueData).getMonth())
        let valueDataMonthRight = (new Date(element.valueDataRight).getMonth())
        let valueDataYear = (new Date(element.valueData).getFullYear())
        let valueDataYearRight = (new Date(element.valueDataRight).getFullYear())
        let currentDate = (new Date().getDate())
        let currentYear = (new Date().getFullYear())
        if(valueDataMonth-valueDataMonthRight === 0 && (valueDataYear-valueDataYearRight === 0 && valueDataYear === currentYear && valueDataYearRight === currentYear) && (valueDataDate-valueDataRightDate===0 || valueDataDate-valueDataRightDate ===-1) && element.totalTimes<=24){
        const formData = new FormData()
        formData.append('is_ad',element.toDos)
        formData.append('is_baslangic',element.valueData.toLocaleDateString())
        formData.append('is_bitis',element.valueDataRight.toLocaleDateString())
        formData.append('toplamsure',element.totalTimes)
        formData.append('action','add-todo')
        fetch(`${process.env.REACT_APP_ENDPOINT}`,{
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if(data.error){
            alert("data error")
          }
          else{
            setIsCompleted(true)
          }
        })
        return addTodo
        }
        else{
          setChecker(true)
          setTimeout(() => {
            setChecker(false)
          }, 2500);
        }
      });
    
    setTimeout(() => {
      setIsCompleted(false)
      setErrorCheck(false)
    }, 100);
    }
    useEffect(() => {
      getUserName()
    }, []);
    useEffect(()=>{
     if(window.localStorage.getItem('isLoggedIn') !=='true' || window.localStorage.getItem('isLoggedIn') === null){
     props.history.push("/")
     }
    })
  return (
    <div>
<div className="infoAreaContainer">
<div className='infoArea container'>
  <div className="row">
    <div className="col-4">
      {day}
    </div>
    <div className="col-4">
    {emailData}
    </div>
    <div className="col-4">
     {showTime}
    </div>
    <div className="col-4 mt-2">
      <i class="fa-solid fa-calendar-days dada"></i>
    </div>
    <div className="col-4 mt-2">
    <i class="fa-solid fa-user-pen dada "></i>
    </div>
    <div className="col-4 mt-2">
    <i class="fa-solid fa-clock dada"></i>
    </div>
  </div>
</div>
</div>
   
    <div className='userPanel container'>

      <div className='tables'>
  
  <table class="ui very compact small table unstackable">
  <thead>
    <tr><th>İşin Adı</th>
    <th>İş Başlangıç</th>
    <th>İş Bitiş</th>
    <th>Süre(Saat)</th>
  </tr></thead>
  <tbody>
 
   {
       valuesObject.map(item=>(          
           <tr >
               <td><input type="text" placeholder='İşin adını giriniz' onChange={(event)=>item.setTodos(event.target.value)} value={item.toDos} name="todoName"/></td>
               <td>
           <DatePicker onChange={item.valueDataSet} value={item.valueData} name="startTime" className="datepicker"/>
               </td>
               <td>
            <DatePicker onChange={item.valueDataSetRight} value={item.valueDataRight} name="endTime" className="datepicker" />
            </td>
            <td><input type="text" placeholder='Toplam Süre' onChange={(event)=>item.setTotalTimes(event.target.value)} value={item.totalTimes} name="totalTime" /></td>
           </tr>
           
       ))
   }
  </tbody>
</table>


  </div>
  <div className='submitButton mt-3'>
  <Warning isCompleted={isCompleted}/>
  <Error errorCheck={errorCheck}/>
  <Button variant="contained" color={"success"} onClick={addTodo} className={"userPanelButton smallButtons"}><span>Onayla</span></Button>
  </div>
  </div>
   {checker===true ? alertFunc() : ""}
  </div>

  )
}
export default withRouter((Userpanel))