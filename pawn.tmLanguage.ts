// Pawn for Shiki, which has no grammar of its own for it: enough for the docs'
// .inc and .sma snippets - comments, strings, #include, keywords, tags
// (`bool:`, `Float:`), natives and calls.
// ponytail: a small grammar, not a full one; extend the patterns when a snippet reads wrong.

export default {
  name: 'pawn',
  scopeName: 'source.pawn',
  aliases: ['sma', 'inc'],
  repository: {},
  patterns: [
    { name: 'comment.block.documentation.pawn', begin: '/\\*\\*', end: '\\*/' },
    { name: 'comment.block.pawn', begin: '/\\*', end: '\\*/' },
    { name: 'comment.line.double-slash.pawn', match: '//.*$' },
    { name: 'string.quoted.double.pawn', begin: '"', end: '"', patterns: [{ name: 'constant.character.escape.pawn', match: '\\^.|\\\\.' }] },
    { name: 'string.quoted.single.pawn', match: '\'(?:\\^.|\\\\.|[^\'])\'' },
    {
      match: '^\\s*(#\\s*(?:include|tryinclude|define|if|else|endif|pragma|assert))\\b\\s*(<[^>]*>)?',
      captures: { 1: { name: 'keyword.control.directive.pawn' }, 2: { name: 'string.quoted.other.pawn' } },
    },
    { name: 'storage.modifier.pawn', match: '\\b(?:native|forward|public|stock|static|const|new|enum|decl)\\b' },
    { name: 'keyword.control.pawn', match: '\\b(?:if|else|for|while|do|switch|case|default|break|continue|return|goto|sizeof|charsmax|tagof)\\b' },
    { name: 'constant.language.pawn', match: '\\b(?:true|false|EOS|cellbits|cellmax|cellmin)\\b' },
    { name: 'entity.name.type.tag.pawn', match: '\\b[A-Za-z_]\\w*(?=:(?!:))' },
    { name: 'constant.numeric.pawn', match: '\\b(?:0x[0-9A-Fa-f]+|\\d+(?:\\.\\d+)?)\\b' },
    { name: 'entity.name.function.pawn', match: '\\b[A-Za-z_@]\\w*(?=\\s*\\()' },
  ],
}
