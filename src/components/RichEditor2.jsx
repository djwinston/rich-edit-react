import React from 'react'

import 'devextreme/dist/css/dx.dark.css'
import 'devexpress-richedit/dist/dx.richedit.css'

import {
  create,
  RichEdit,
  DocumentFormat
} from 'devexpress-richedit'

import ApplyButton from './Button'
import documentAsBase64 from '../data/doc'
import { newDataSource } from '../data/params'

const RichEditComponent = ({options}) => {
  const richEditorRef = React.useRef(() => new RichEdit())

  const handleClick = () => {
    richEditorRef.current.hasUnsavedChanges = true
    richEditorRef.current.saveDocument()
  }

  React.useEffect(() => {    
    if(richEditorRef.current.document) return
    richEditorRef.current = create(document.getElementById('richEdit'), options)
    richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
    richEditorRef.current.mailMergeOptions.setDataSource(newDataSource)
    console.log(`TCL>>> ~ newDataSource`, newDataSource)
    richEditorRef.current.events.saving.addHandler(function (s, e) {
      console.log('handleSave =>', e)
      e.handled = false
    })
    richEditorRef.current.saveDocument(DocumentFormat.Rtf)
  }, [options])

  return (
    <>
      <div id="richEdit" /* ref={richEditorRef} */></div>
      <ApplyButton click={handleClick} />
    </>
  )
}

export default RichEditComponent
