const map = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': '\'',
}

export function getHtml(text) {
  return text.replace(/&[^&;]+;/g, s => map[s])
}