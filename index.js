"use client";

import { useState } from "react"
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([])

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId)
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId)
      else copyMultiple.splice(findIndexOfCurrentId, 1)
    
    setMultiple(copyMultiple);
  }
  console.log(selected, multiple);

  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-gray-500">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
      {
        data && data.length > 0 ?
        data.map((dataItem) => (
          <div key={dataItem.id} className="item">
            <div 
              onClick={
                enableMultiSelection 
                ? () => handleMultiSelection(dataItem.id) 
                : () => handleSingleSelection(dataItem.id)
              } 
              className="title"
            >
              
              <h3>{dataItem.question}</h3>
              <span>+</span>
            </div>
            {enableMultiSelection
              ? multiple.indexOf(dataItem.id) !== -1 && (
                <div>{dataItem.answer}</div>
              ) : selected === dataItem.id && (
                <div>{dataItem.answer}</div>
              )
            }
            {/* {
              selected === dataItem.id || multiple.indexOf(dataItem.id === -1) ?
              <div className="content">{dataItem.answer}</div>
              : null
            } */}
          </div>
        ))
        : <div>No data found</div>
      }
    </div>
  )
}
