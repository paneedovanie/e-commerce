module.exports.encode = function (str, length) {
    const output = []

    for(var i = str.length; i < length; i++) {
        str += ' '
    }

    str.split('').map(c => {
      output.push(( c.charCodeAt(0) / 255 ))
    })

    return output
} 