import React, { useEffect,useState } from 'react'
import Modal from "../components/Modal"
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
export default function AdminPanel(props) {
const [getReportsData,setGetReportsData] = useState([])

  const deleteData = todoId =>{
    const formData = new FormData()
    formData.append('id',todoId)
    formData.append('action','delete-data')
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
     
       setGetReportsData(getReportsData.filter(todo=>todo.id !== todoId))
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
   .then(data => setGetReportsData(data.reportsData))
  },[])
  useEffect(()=>{
    if(!window.localStorage.getItem('isLoggedIn') || window.localStorage.getItem('isLoggedIn')==='false' || window.localStorage.getItem('isAdmin')!=='admin' ){
    props.history.push("/")
    }
   })
  return (
      <div className='adminPanel container'>
<div className='titleArea'>
  <span>Yönetici Paneli</span>
</div>
    <div className='tables'>
   
<table className="ui very compact small table unstackable">
<thead>
<tr><th>İşin Adı</th>
<th>İş Başlangıç</th>
<th>İş Bitiş</th>
<th>Toplam Süre</th>
<th>İş Sil</th>
</tr></thead>
<tbody> 
  {
  getReportsData.map(items=>(
  <tr>
         <td><input type="text" value={items.is_ad} readOnly/></td>
         <td>
         <input type="text" value={items.is_baslangic} readOnly/>
         </td>
         <td>
         <input type="text" value={items.is_bitis} readOnly/>
      </td>
      <td><input type="text" value={items.toplamsure} readOnly /></td>
      <td><button onClick={()=>deleteData(items.id)} className='btn btn-danger btn-sm'><span>Sil</span></button></td>
     </tr>

  ))
}

</tbody>
</table>


</div>
    
<div className='submitButton mt-3'>
<Modal/>
 <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="positive ui button mx-2 smallButtons downloadButton"
                    table="excelTable"
                    filename="rapor"
                    sheet="tablexls"
                    buttonText="Raporu İndir"/>
                    
                    

</div>
<div className='hiddenElement'>

<table className="ui very compact small table unstackable" id="excelTable">
<thead>
<tr><th>İşin Adı</th>
<th>İş Başlangıç</th>
<th>İş Bitiş</th>
<th>Toplam Süre</th>

</tr></thead>
<tbody> 
  {
  getReportsData.map(items=>(
  <tr>
         <td><input type="text" value={items.is_ad} readOnly/></td>
         <td>
         <input type="text" value={items.is_baslangic} readOnly/>
         </td>
         <td>
         <input type="text" value={items.is_bitis} readOnly/>
      </td>
      <td><input type="text" value={items.toplamsure} readOnly /></td>
     </tr>

  ))
}

</tbody>
</table>



</div>
</div>
  )
}
