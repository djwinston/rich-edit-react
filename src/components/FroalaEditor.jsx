import React, { useRef, useEffect } from 'react'
import ApplyButton from './Button'
import CONTENT from '../data/content'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css'

import FroalaEditor from 'react-froala-wysiwyg'

const FroalaEdit = () => {
  const editorRef = useRef(null)

  const handleClick = () => {
    console.log('handleClick')
    const htmlContent = editorRef.current.editor.html.get()
    console.log(htmlContent)
  }

  useEffect(() => {
    console.log('init floara');
  }, [])

  return (
    <>
      <FroalaEditor tag="textarea" ref={editorRef} model={CONTENT} />
      <ApplyButton click={handleClick} />
    </>
  )
}

export default FroalaEdit
