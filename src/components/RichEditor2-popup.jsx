import React, { useEffect, useState } from 'react'

import 'devextreme/dist/css/dx.dark.css'
import 'devexpress-richedit/dist/dx.richedit.css'
import Popup from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import ApplyButton from './Button'
import documentAsBase64 from '../data/doc'
import { create, RichEdit, DocumentFormat } from 'devexpress-richedit'
import 'devextreme/dist/css/dx.light.css'
import 'devexpress-richedit/dist/dx.richedit.css'

const RichEditPopupComponent = ({ options, isPreviewMode }) => {
  const [isShow, setIsShow] = React.useState(false)
  const richEditorRef = React.useRef(() => new RichEdit())
  const [element, setElement] = useState(null)

  const setProtection = () => {
    richEditorRef.current.readOnly = true
    richEditorRef.current.showHorizontalRuler = false
  }

  const initContainer = React.useCallback((containerElement) => {
    try {
      richEditorRef.current = create(containerElement, {})
      richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      richEditorRef.current.events.documentLoaded.addHandler(function (s, e) {
        setProtection()
      })
      richEditorRef.current.saveDocument(DocumentFormat.Rtf)
    } catch (error) {
      console.log('RichEdit ERROR', error)
    }
  }, [])

  useEffect(() => {
    if (!element) return
    initContainer(element)
  }, [element, initContainer])

  return (
    <>
      <Popup
        onContentReady={(e) => {
          const el = document.getElementById('richEdit')
          setElement(el)
        }}
        onOptionChanged={(e) => {
          console.log('optionsChanged', e)
          if (e.name === 'visible' && e.value === false) {
            setIsShow(e.value)
          }
        }}
        // onHidden={e => console.log('onHidden', e)}
        width={1000}
        height={600}
        visible={isShow}
        showTitle={true}
        title="PopUp"
        closeOnOutsideClick={false}
      >
        <ScrollView width="100%" height="100%">
          <div id="richEdit"></div>
        </ScrollView>
      </Popup>
      <ApplyButton title="Show" click={() => setIsShow(true)} />
    </>
  )
}

export default RichEditPopupComponent
