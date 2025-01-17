import React, { useState } from "react"
import axiosWithAuth from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
}

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  const addColor = e => {
    e.preventDefault()

    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        setNewColor(initialColor)
      })
      .catch(err => {
        console.error(err)
      })
  }

  
  const saveEdit = e => {
    e.preventDefault()

    const id = 
      [colors.find(color => color.id === colorToEdit.id)]
      .map(color => color.id)[0]
    
    axiosWithAuth().put(`/colors/${id}`, colorToEdit)
    .then(res => { 
      updateColors([
        ...colors.slice(0, colorToEdit.id - 1),
        res.data,
        ...colors.slice(colorToEdit.id)
      ])
    })
    .catch(err => {
      console.error(err)
    })
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      <form onSubmit={addColor}>
          <legend>add new color</legend>
          <label>
            color name:
            <input 
              onChange={e => {
                setNewColor({...newColor, color: e.target.value})
              }}
              value={newColor.color} 
            />
          </label>
          <label>
            hex code:
            <input 
              onChange={e => {
                setNewColor({...newColor, code: { hex: e.target.value }})
              }}
              value={newColor.code.hex} 
            />
          </label>
          <div className="button-row">
            <button 
              type="submit"
              onClick={addColor}
            >
              +
            </button>
          </div>
      </form>
      
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  )
}

export default ColorList
