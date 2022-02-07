import React from 'react'

// import 'devextreme/dist/css/dx.dark.css'
// import 'devexpress-richedit/dist/dx.richedit.css'

import { create, RichEdit, DocumentFormat, MergeMode } from 'devexpress-richedit'

import documentAsBase64 from '../data/doc'
import { newDataSource } from '../data/params'
import ApplyButton from './Button'

const RichEditMerge = ({ options }) => {
  const richEditorRef = React.useRef(() => new RichEdit())

  const handleClick = () => {
    richEditorRef.current.hasUnsavedChanges = true
    richEditorRef.current.saveDocument()
  }

  React.useEffect(() => {
    try {
      // if (richEditorRef.current.document) return
      richEditorRef.current = create(document.getElementById('richEdit'), options)
      richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      richEditorRef.current.mailMergeOptions.setDataSource(newDataSource)
      // richEditorRef.current.selection.activeSubDocument.fields.create(richEditorRef.current.selection.active, 'MERGEFIELD fieldName');
      richEditorRef.current.selection.activeSubDocument.fields.createMergeField(richEditorRef.current.selection.active, 'Name');
      richEditorRef.current.selection.activeSubDocument.fields.createMergeField(richEditorRef.current.selection.active, 'age');
      // console.log(`TCL>>> ~ richEditorRef.current.selection.activeSubDocument.fields`, richEditorRef.current.selection.activeSubDocument.fields)
      // console.log(`TCL>>> ~ richEditorRef.current.selection.active`, richEditorRef.current.selection.active)
      const format = DocumentFormat.Rtf
      const merge = new richEditorRef.current.mailMerge( () =>(mergedDocument) => {
        console.log('mergedDocument++++++>>>>', mergedDocument);
        richEditorRef.current.openDocument(mergedDocument, "MergedDocument", format);
    }, MergeMode.NewParagraph, format)
      console.log('merge', merge);
    //   richEditorRef.current.mailMerge( () =>(mergedDocument) => {
    //     console.log('mergedDocument++++++>>>>', mergedDocument);
    //     richEditorRef.current.openDocument(mergedDocument, "MergedDocument", format);
    // }, MergeMode.NewParagraph, format)
      // console.log(`TCL>>> ~ newDataSource`, newDataSource)
      // richEditorRef.current.events.saving.addHandler(function (s, e) {
      //   console.log('handleSave =>', e)
      //   e.handled = false
      // })
      // richEditorRef.current.saveDocument(DocumentFormat.Rtf)
    } catch (error) {
      console.log('rich edit merge ERROR', error)
    }
  }, [options])

  return <><div id="richEdit">Rich Merge</div> <ApplyButton click={handleClick} /></>
}

export default RichEditMerge
