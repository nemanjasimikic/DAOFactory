// Parameters: Data is input value,
// the page the user is on,
// which input is expected / hour or day in case of page 3,
// should you alert the user (not enabled when validating inside input)
// and isVoting is for determining the min amount on page 3 of create dao page
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
    } else if (what === 'governanceToken') {
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
      if (parseInt(data) < 10000) {
        error = true
        if (toAlert) {
          alert("Threshold value can't be lower than 10 000")
        }
        return 'Error: Threshold value too low'
      } else if (parseInt(data) > 7000000) {
        error = true
        if (toAlert) {
          alert('Threshold value cannot be more than 7 000 000')
        }
        return 'Error: Threshold value too high'
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
  }

  if (!error) {
    return true
  }
}

export const whatPage = (registerInput) => {
  if (
    registerInput === 'name' ||
    registerInput === 'governanceToken' ||
    registerInput === 'minStake'
  ) {
    return 0
  } else if (registerInput === 'threshold') {
    return 1
  } else {
    return 2
  }
}

export const checkValidity = (checks) => {
  let pass = true
  for (var i = 0; i < checks.length; i++) {
    if (checks[i] !== true) {
      console.log('PASSES', false)
      pass = false
    }
  }
  console.log('PASS', pass)
  return pass
}
