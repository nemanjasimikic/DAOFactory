

export const addressConverter = (string) => {
    let stringify = JSON.stringify(string);
    let parse = stringify.replace(/[^\w\s]/gi, '');
    return parse.slice(0, 1) + ':' + parse.slice(1);
  }