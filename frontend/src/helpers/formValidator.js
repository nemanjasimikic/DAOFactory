export const validator = (data, page, what, toAlert, isVoting) => {
  let error = false
  // Page 1
  if (page == 0) {
    if (what === 'name') {
      if (!data || !data.replace(/\s/g, '').length) {
        error = true
        if (toAlert) {
          alert('Name field must not be empty')
        }
      } else {
        error = false
      }
    } else if (what === 'daoSlug') {
      // unwanted_chars = ['0-9', 'a-z']
      if (!(data.split('/')[3] === undefined)) {
        return "Error: Slug can't contain forslash"
      }
      if (isEmptyOrSpaces(data.split('/')[2])) {
        error = true
        console.log('MISSING SLUG?', data)
        return 'Error: Slug missing'
      } else if (data.split('/')[2].includes('/')) {
        error = true
        // console.log('ILLEGAL CHAR IN SLUG!')
        return 'Error: Slug contains illegal characters'
      }
    } else if (what === 'governanceToken' || what === 'ownerAddress') {
      if (data.length < 66) {
        error = true
        if (toAlert) {
          alert('Governance token is not valid. Address too short!')
        }
        return 'Error: Address too short'
      } else if (data.length > 66) {
        error = true
        if (toAlert) {
          alert('Governance token is not valid. Address too long!')
        }
        return 'Error: Address too long'
      } else if (!data.includes(':')) {
        error = true
        if (toAlert) {
          alert('Governance token is not valid. Address missing colon!')
        }
        return 'Error: Address missing colon'
      }
    } else if (what === 'minStake') {
      if (!data && data <= 0) {
        error = true
        if (toAlert) {
          alert('The min amount for stake must be 1')
        }
        return 'Error: Insuficient amount'
      } else if (isNaN(data)) {
        error = true
        return 'Error: Invalid input'
      } else {
        error = false
      }
    }

    // Page 2
  } else if (page == 1) {
    if (what === 'threshold') {
      if (isNaN(data)) {
        error = true
        if (toAlert) {
          alert('Thershold value must be a positive number')
        }
        return data[0] === '-'
          ? 'Error: Only positive numbers allowed'
          : 'Error: Only numbers allowed'
      } else if (!data) {
        error = true
        return 'Error: Cannot be empty'
      } else {
        error = false
      }
    }

    // Page 3
  } else if (page == 2) {
    let multiplier = what == 'Hours' ? 1 : 24
    let min = 24
    if (isNaN(data)) {
      error = true
      if (toAlert) {
        alert('Only numbers allowed in input')
      }
      return 'Error: Only numbers allowed'
    } else if (data * multiplier >= min && data * multiplier <= 720) {
      error = false
    } else {
      error = true
      if (toAlert) {
        alert("Value can't be lower than 48h, or more than 720h / 30 days")
      }
      return `Error: Value can't be lower than ${min}h or over 720h`
    }
    // console.log('ERROR IN PAGE 2? : ', data)
  }

  if (!error) {
    return true
  }
}

export const whatPage = (registerInput) => {
  if (
    registerInput === 'name' ||
    registerInput === 'governanceToken' ||
    registerInput === 'minStake' ||
    registerInput === 'ownerAddress' ||
    registerInput === 'daoSlug'
  ) {
    return 0
  } else if (registerInput === 'threshold') {
    return 1
  } else if (
    registerInput === 'queued' ||
    registerInput === 'voting' ||
    registerInput === 'execution' ||
    registerInput === 'pending'
  ) {
    return 2
  }
}

export const checkValidity = (checks) => {
  let pass = true
  for (var i = 0; i < checks.length; i++) {
    if (checks[i] !== true) {
      // console.log('PASSES', false)
      pass = false
    }
  }
  // console.log('PASS', pass)
  return pass
}

/// To be removed later
export const styling = (what, param) => {
  if (
    what === 'queued' ||
    what === 'pending' ||
    what === 'voting' ||
    what === 'execution'
  ) {
    if (param === 'position') {
      return 'absolute'
    } else {
      return '0'
    }
  } else {
    if (param === 'position') {
      return 'relative'
    } else if (param === 'bottom') {
      return null
    } else if (param === 'marginT') {
      return '-0.80rem'
    } else if (param === 'marginB') {
      return '0.80rem'
    }
    return 'relative'
  }
}

export const isEmptyOrSpaces = (str) => {
  // console.log('IS EMPTY OR NO?', str)
  return str === null || str === undefined || str.match(/^ *$/) !== null
}
