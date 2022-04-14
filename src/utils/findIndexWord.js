export default function findIndexWord(text, searchLowerCase) {
    const result = text.toLowerCase().indexOf(searchLowerCase)
    return result === -1 ? false : result
}