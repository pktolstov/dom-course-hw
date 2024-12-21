export const replaceSymbols = (text) => {
    return text
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('start###', "<div class='quote'>")
        .replaceAll('end###', '<div>')
}
