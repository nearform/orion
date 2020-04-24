const specialCharacters =
  'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
const normalCharacters =
  'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
const catcher = new RegExp(specialCharacters.split('').join('|'), 'g')
const slugify = title =>
  window.encodeURI(
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(catcher, character =>
        normalCharacters.charAt(specialCharacters.indexOf(character))
      )
      .replace(/&/g, '-and-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  )

export default slugify
