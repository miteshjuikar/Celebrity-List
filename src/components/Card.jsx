import React, { useState } from 'react';
import DeleteLogo  from "../assets/delete.svg?react"
import EditLogo  from "../assets/edit.svg?react"
import OkLogo  from "../assets/ok.svg?react"
import WrongLogo  from "../assets/wrong.svg?react"

function Card({item, index, handleDialogOpen}) {
  const [edit, setEdit] = useState(true)
  const [data, setData] = useState(item)
  const [activeIndex, setActiveIndex] = useState(null);
  const onTitleClick = (index) => {if(edit){
    setActiveIndex(index === activeIndex ? null : index);
  }};
  function handleCancel(){
    setData(item)
    setEdit(!edit)
  }
  function handleSubmit(){
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          setData(item)
        }}}
    setEdit(!edit)
  }
  function handleData(e) {
    const {value, name} = e.target;
    setData(prev=>({
      ...prev,
      [name]: value
    }))
  }
  const isActive = index === activeIndex ? 'active' : '';
  return (
    <div className={`item ${isActive}`}>
      <div className="header" onClick={() => onTitleClick(index)}>
          <img src={data.picture} className="logo"/>
          <input type="text" value={data.name} className="name" disabled={edit} 
            onChange={handleData} name="name" 
          />
          {!isActive ? <p className='showDrop'>+</p> : <p className='showDrop'>-</p>}
      </div>
      <div className={`content ${isActive}`}>
        <div className='labelHeader'>
        <div className='labelData'>
          <label>Age</label>
          <label><input type="number" value={data.dob} disabled={edit} 
            name="dob" onChange={handleData} min="0" required /> Years</label>
        </div>
        <div className='labelData'>
          <label>Gender</label>
          <label><select disabled={edit} value={data.gender} name="gender"
              onChange={handleData}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="rathernotsay">Rather not say</option>
            <option value="other">Other</option>
          </select></label>
        </div>
        <div className='labelData'>
          <label>Country</label>
          <label><input type="text" value={data.country} disabled={edit}
            name="country" onChange={handleData}
          /></label>
        </div>
        </div>
          <p className='descriptionHeader'>Description</p>
          <textarea className='description' disabled={edit} value={data.description}
            name="description" onChange={handleData}
          />
        <div className="buttons">
          {edit ? 
          (<><DeleteLogo className="logoBtn" onClick={()=>{handleDialogOpen(data.id)}}/>
          <EditLogo className="logoBtn" onClick={()=>{setEdit(!edit)}}/></>):
          (<><WrongLogo className="logoBtn" onClick={handleCancel}/>
          <OkLogo className="logoBtn" onClick={handleSubmit}/></>)}
        </div>
      </div>
    </div>
  );
}
export default React.memo(Card)