import React from 'react'

// import 'devextreme/dist/css/dx.dark.css'
// import 'devexpress-richedit/dist/dx.richedit.css'

import {
  create,
  RichEdit,
  DocumentFormat,
  MergeMode,
  UpdateFieldsOptions,
  MailMergeTabCommandId,
} from 'devexpress-richedit'

import documentAsBase64 from '../data/doc'
import { newDataSource } from '../data/params'
import ApplyButton from './Button'

const RichEditMerge = ({ options }) => {
  const richEditorRef = React.useRef(() => new RichEdit())
  // const pdfRef = React.useState(() => new window.PDFDocument())

  const handleClick = () => {
    richEditorRef.current.hasUnsavedChanges = true
    richEditorRef.current.saveDocument()
  }

  const exportToPdf = () => {
    // richEditorRef.current.hasUnsavedChanges = true;
    // richEditorRef.current.exportToPdf(richEditorRef.current.exportToPdf.documentName, pdfRef.current)
  }

  React.useEffect(() => {
    const scriptPdfKit = document.createElement('script')
    const scriptBlobStream = document.createElement('script')
    scriptPdfKit.src = 'https://github.com/devongovett/pdfkit/releases/download/v0.10.0/pdfkit.standalone.js'
    scriptBlobStream.src = 'https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js'
    scriptPdfKit.async = true
    scriptBlobStream.async = true
    document.body.appendChild(scriptPdfKit)
    document.body.appendChild(scriptBlobStream)
    setTimeout(() => {
      console.log('init')
    }, 1000)
    try {
      console.log('richEditorRef.current', richEditorRef)
      // if (richEditorRef.current.document) return
      const el = document.getElementById('richEdit')
      richEditorRef.current = create(el, options)
      richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      richEditorRef.current.mailMergeOptions.setDataSource(newDataSource)
      richEditorRef.current.saveDocument(DocumentFormat.Rtf)
      // var doInAllSubDocuments = true
      // var updateTocFields = true
      // var newOptions = new UpdateFieldsOptions(doInAllSubDocuments, updateTocFields)
      setTimeout(() => {
        console.log('toggle')
        richEditorRef.current.executeCommand(MailMergeTabCommandId.ToggleViewMergedData, true)
        // richEditorRef.current.executeCommand(MailMergeTabCommandId.UpdateAllFields , true)
        // richEditorRef.current.executeCommand(MailMergeTabCommandId.ShowMailMergeDialog, true)
        // richEditorRef.current.document.fields.updateAllFields(function () {
        //   console.log('Updated')
        // }, newOptions)
      }, 3000)

      // richEditorRef.current.selection.activeSubDocument.fields.create(richEditorRef.current.selection.active, 'MERGEFIELD fieldName');
      // richEditorRef.current.selection.activeSubDocument.fields.createMergeField(richEditorRef.current.selection.active, 'Name');
      // richEditorRef.current.selection.activeSubDocument.fields.createMergeField(richEditorRef.current.selection.active, 'age');
      // console.log(`TCL>>> ~ richEditorRef.current.selection.activeSubDocument.fields`, richEditorRef.current.selection.activeSubDocument.fields)
      // console.log(`TCL>>> ~ richEditorRef.current.selection.active`, richEditorRef.current.selection.active)
      // const format = DocumentFormat.Rtf
      //   const merge = new richEditorRef.current.mailMerge( () =>(mergedDocument) => {
      //     console.log('mergedDocument++++++>>>>', mergedDocument);
      //     richEditorRef.current.openDocument(mergedDocument, "MergedDocument", format);
      // }, MergeMode.NewParagraph, format)
      //   console.log('merge', merge);
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
      el.remove()
    } catch (error) {
      console.log('rich edit merge ERROR', error)
    }
  }, [options])

  return (
    <>
      <div /* style={{display: 'none'}} */>
        <div id="richEdit">{/* Rich Merge */}</div>
      </div>
      <ApplyButton click={handleClick} />
      <ApplyButton title="export" click={exportToPdf} />
    </>
  )
}

export default RichEditMerge
