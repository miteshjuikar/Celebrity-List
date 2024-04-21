import React, { useState } from 'react';
import Card from './Card';
import Dialog from './Dialog';
import items from "../celebrities.json"

const Accordion = () => {
  const [search, setSearch] = useState("")
  const [isDialogOpen, setDialogOpen] = useState({id: 0, value: false});
  const [data, setData] = useState(items)

  const handleFilter = (val) => {
    setSearch(val)
    const filteredData = items.filter((el) => {
      if (val === '') {
          return el;
      }else {
          return el.first.toLowerCase().includes(val) || el.last.toLowerCase().includes(val)
      }
  })
    setData(filteredData);
  };
  const handleConfirmDelete = () => {
    const filtered = data.filter(data => data.id != isDialogOpen.id);
    setData(filtered)
    setDialogOpen({id: 0, value: false})
  };
  return (
  <div className="accordion">
    <input type="text" value={search} 
      onChange={(e)=>{handleFilter(e.target.value)}}
      placeholder="Search user name" className='searchInput'/>
    {data?.map((item, index) => {
      let age = item.dob.split("-")
      let dob = new Date(...age)
      let diff_ms = Date.now() - dob.getTime();
      let age_dt = new Date(diff_ms); 
      let calAge = Math.abs(age_dt.getUTCFullYear() - 1970);
      return(
        <Card item={{...item, dob: calAge, name: item.first + " " + item.last}} key={item.id}
        index={index}
        handleDialogOpen={(val)=>{setDialogOpen({id: val, value: true})}}/>
      )})}
      {isDialogOpen.value && 
        <Dialog 
        handleConfirmDelete={handleConfirmDelete} 
        handleCancelDelete={()=>{setDialogOpen({id: 0, value: false})}}/>}
    
  </div>
  );
};

export default Accordion;
