import { useState } from 'react'

 export default function useInput (initialValue) {
    const [value, setValue] = useState(initialValue)
    const handleChanges = ev => {
      setValue({...value, [ev.target.name]: ev.target.value})
    }
    return [value, setValue, handleChanges]
  }
