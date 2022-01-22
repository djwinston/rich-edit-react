export const organizationParams = [
  { key: 'rudium', name: 'Rudium', value: '' },
  { key: 'fambli', name: 'Fambli', value: 'famb' },
  { key: 'yapoly', name: 'Yapoly', value: '' },
  { key: 'kwater', name: 'Kwater', value: '' },
  { key: 'yarilo', name: 'Yarilo', value: '' },
  { key: 'elfing', name: 'Elfing', value: '' },
  { key: 'fimati', name: 'Fimati', value: '' },
  { key: 'sufflo', name: 'Sufflo', value: '' },
  { key: 'loatin', name: 'Loatin', value: '' },
  { key: 'fashri_1', name: 'Fashri 1', value: '' },
  { key: 'fashri_2', name: 'Fashri 2', value: '' },
  { key: 'fashri_3', name: 'Fashri 3', value: '' },
  { key: 'fashri_4', name: 'Fashri 4', value: '' },
  { key: 'fashri_5', name: 'Fashri 5', value: '' },
]

export const bridgingXParams = [
  { key: 'rudium2', name: 'Rudium2', value: '' },
  { key: 'fambli2', name: 'Fambli2', value: 'fambli' },
  { key: 'yapoly2', name: 'Yapoly2', value: '' },
  { key: 'kwater2', name: 'Kwater2', value: '' },
  { key: 'yarilo2', name: 'Yarilo2', value: '' },
  { key: 'elfing2', name: 'Elfing2', value: '' },
  { key: 'fimati2', name: 'Fimati2', value: '' },
  { key: 'sufflo2', name: 'Sufflo2', value: '' },
  { key: 'loatin2', name: 'Loatin2', value: '' },
  { key: 'fashri2', name: 'Fashri2', value: '' },
]

// const getRichEditOptions = (categoryName, arrParams) =>
//   arrParams.map((param, index) => {
//     return { ID: index, key: param.key, Category: categoryName, Name: param.name, data: { ...param } }
//   })

const getRichEditOptions = (categoryName, arrParams) => {
  return { category: categoryName, collection: arrParams }
}

export const richEditSelectBoxOptions = [...organizationParams, ...bridgingXParams].map((param) => param.name)
// export const richEditSelectBoxOptions2 = [
//   ...getRichEditOptions('Organization Parameters', organizationParams),
//   ...getRichEditOptions('BridgingX Parameters', bridgingXParams),
// ]
export const richEditSelectBoxOptions2 = [
  getRichEditOptions('Organization Parameters', organizationParams),
  getRichEditOptions('BridgingX Parameters', bridgingXParams),
] //?
