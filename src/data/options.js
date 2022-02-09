import { createOptions, ViewType, RichEditUnit/* , RibbonButtonItem, RibbonSelectBoxItem */ } from 'devexpress-richedit'

// import { newDataSource, arr } from './params'

const options = createOptions()
console.log('options', options)

// const ribonTabs = options.ribbon.tabs.filter((tab) => !tab.contextTab)
// const getTabIndexByName = (tabName) => ribonTabs.findIndex((tab) => tab.title === tabName)

// const newButton = new RibbonButtonItem('template_params', 'Template', {
//   showText: true,
//   icon: 'dxre-icon-AlignFloatingObjectBottomLeft',
// })

// console.log(`TCL>>> ~ sourceData`, sourceData)

// const newSelectBox = new RibbonSelectBoxItem(
//   'templateSelect',
//   new ArrayStore({ data: richEditSelectBoxOptions2[0].collection, key: 'key' }),
//   {
//     beginGroup: true,
//     width: 150,
//     displayExpr: 'name',
//     valueExpr: 'key',
//     placeholder: 'Parameter',
//   }
// )

// const tabNameInsert = options.ribbon.getTab(getTabIndexByName('Insert'))
// tabNameInsert.insertItem(newButton, 10)
// tabNameInsert.insertItem(newSelectBox, 4)

options.bookmarks.visibility = true
options.bookmarks.color = '#ff0000'

options.confirmOnLosingChanges.enabled = true
options.confirmOnLosingChanges.message =
  'Are you sure you want to perform the action? All unsaved document data will be lost.'

options.fields.updateFieldsBeforePrint = true
options.fields.updateFieldsOnPaste = true
options.document.protect = 'www'

options.mailMerge.activeRecord = 1
options.mailMerge.viewMergedData = false
// options.mailMerge.setDataSource = []
//[
//   { Name: 'Indy', age: 32 },
//   { Name: 'Andy', age: 29 },
// ]

// events
options.events.activeSubDocumentChanged = () => {}
options.events.autoCorrect = () => {}
options.events.calculateDocumentVariable = () => {}
options.events.characterPropertiesChanged = () => {}
options.events.contentInserted = () => {}
options.events.contentRemoved = () => {}
options.events.documentChanged = () => {}
options.events.documentFormatted = () => {}
options.events.documentLoaded = () => {}
options.events.gotFocus = () => {}
options.events.hyperlinkClick = () => {}
options.events.keyDown = () => {}
options.events.keyUp = () => {}
options.events.paragraphPropertiesChanged = () => {}
options.events.lostFocus = () => {}
options.events.pointerDown = () => {}
options.events.pointerUp = () => {}
options.events.saving = (e, s) => {
  console.log('saving ======>', e, s)
}
options.events.saved = (e) => {
  console.log('>>>>>Saved', e)
}
options.events.selectionChanged = () => {}
options.events.customCommandExecuted = (s, e) => {
  // console.log('customCommandExecuted s', s)
  // console.log('customCommandExecuted e', e)
  switch (e.commandName) {
    case 'insertEmailSignature':
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, '_________')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'Best regards,')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'John Smith')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'john@example.com')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, '+1 (818) 844-0000')
      break
    case 'template_params':
      s.document.insertText(s.document.length, '{{ custom Template }}')
      break
    case 'templateSelect':
      s.document.insertText(s.selection.active, `{{ ${e.parameter} }}`)
      break
    default:
      console.log('RichEditor custom command not found')
  }
}

options.unit = RichEditUnit.Inch

options.view.viewType = ViewType.PrintLayout
options.view.simpleViewSettings.paddings = {
  left: 15,
  top: 15,
  right: 15,
  bottom: 15,
}
options.exportUrl = 'http://localhost:3030/richserver'

options.readOnly = false
options.width = '1400px'
options.height = '1400px'

export default options
