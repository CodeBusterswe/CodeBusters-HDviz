import React from 'react'
import { elastic as Menu } from 'react-burger-menu'
// try scaleRotate at the end (elastic) or slide
import { CSVReader } from 'react-papaparse'

const BurgerMenu = props => {
  const {
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile
  } = props

    return (

<Menu {...props}>

      <CSVReader id="MyCSVReader"
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        removeButtonColor='#ff0000'
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>


      <a className="menu-item" href="/burgers">
        ITEM DI PROva
      </a>

    </Menu>
    )
  }

  export default BurgerMenu