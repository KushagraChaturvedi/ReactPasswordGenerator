import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

function PasswordGenerator() {
  
  let [password, setPassword] = useState('')
  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [symbolAllowed, setSymbolAllowed] = useState(false)

  // increase in performance by cahing.
  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "QWertERDFGHJKLhjklzZXCNMqwyuVBioYUIOpasdfgxcvbnTPASm"
    let numbers = "1234567890"
    let symbols = "@#$%^&*~?+-"

    if (numberAllowed) str += numbers
    if (symbolAllowed) str += symbols

    for (let i = 0; i < length; i++) {
        password += str[Math.floor(Math.random() * (str.length - 2)) + 1]
    }

    setPassword(password)
  } , [length, numberAllowed, symbolAllowed, setPassword])

  let passwordRef = useRef(null)

  function copyPasswordToClipboard() {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
 
  useEffect(() => {passwordGenerator()}, [length, numberAllowed, symbolAllowed, setPassword])

  return (
    <div className='bg-slate-800 mt-16 py-2 px-4 rounded-xl flex flex-col place-items-center'>
      <h1 className='text-white text-xl'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mt-2 w-full'>
        <input type="text" readOnly={true} className='outline-none w-full px-3 py-1' value={password} ref={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 hover:bg-blue-800'
          onClick={() => {copyPasswordToClipboard()}}
          data-tooltip-id="cpyTip"
          >Copy</button>
          <Tooltip id="cpyTip" content='Password Copied!' openOnClick={true} />
      </div>
      <div className='flex text-orange-500 mt-2 gap-x-2'>
        <input type="range" min={4} max={64} step={2} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
        <label>Length: ({length})</label>
        <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} />
        <label>Numbers</label>
        <input type="checkbox" defaultChecked={symbolAllowed} onChange={() => {setSymbolAllowed((prev) => !prev)}} />
        <label>Symbols</label>

      </div>
      <div>
        <button className='outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-0.5 mt-2 rounded-lg'
          onClick={() => {passwordGenerator()}}
          >Get a new one...</button>
      </div>
    </div>
  )
}

export default PasswordGenerator