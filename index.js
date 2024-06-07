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
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-500 rounded">
      <button 
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Enable Multi Selection
      </button>
      {
        data && data.length > 0 ?
        data.map((dataItem) => (
          <div 
            key={dataItem.id} 
            className="w-full max-w-md mx-auto mb-4 overflow-hidden bg-white rounded-lg shadow-md"
          >
            <div 
              onClick={
                enableMultiSelection 
                ? () => handleMultiSelection(dataItem.id) 
                : () => handleSingleSelection(dataItem.id)
              } 
              className="p-4 border-b cursor-pointer"
            >
              
              <h3 className="text-lg font-medium">{dataItem.question}</h3>
              <span className="text-xl">+</span>
            </div>
            {enableMultiSelection
              ? multiple.indexOf(dataItem.id) !== -1 && (
                <div className="p-4">{dataItem.answer}</div>
              ) : selected === dataItem.id && (
                <div className="p-4">{dataItem.answer}</div>
              )
            }
          </div>
        ))
        : <div>No data found</div>
      }
    </div>
  )
}
