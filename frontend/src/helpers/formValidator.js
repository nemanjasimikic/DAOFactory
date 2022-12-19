export const validator = (data, page, what) => {
  let error = false
  // Page 1
  if (page == 0) {
    // Check to see if name is filled
    if (what === 'name') {
      if (!data || !data.replace(/\s/g, '').length) {
        error = true
      } else {
        error = false
      }
    } else if (what === 'governanceToken') {
      if (data.length < 66) {
        console.log('Error: Address too short')
        error = true
        // alert('Governance token is not valid. Address too short!')
        return 'Error: Address too short'
      } else if (!data.includes(':')) {
        console.log('Error: Address missing colon')
        error = true
        // alert('Governance token is not valid. Address missing colon!')
        return 'Error: Address missing colon'
      }
    } else if (what === 'minStake') {
      if (!data && data <= 0) {
        error = true
        return 'Error: Insuficient amount'
      } else if (!isNaN(data)) {
        error = true
        return 'Error: Invalid input'
      } else {
        error = false
      }
    }

    // Page 2
  } else if (page == 1) {
    if (what === 'threshold') {
      if (parseInt(data) < 9999) {
        // alert('Threshold value cannot be lower than 10 000')
        return 'Threshold value incorrect'
      } else if (parseInt(data) > 7000001) {
        // alert('Threshold value cannot be more than 7 000 000')
        return 'Threshold value incorrect'
      } else {
        error = false
      }
    }

    // Page 3
  } else if (page == 2) {
    var multiplier = what == 'Hours' ? 1 : 24
    if (data * multiplier >= 24 && data * multiplier <= 720 && !isNaN(data)) {
      error = false
    } else {
      //   alert('Value cannot be lower than 24h, or more than 720h / 30 days')
      return 'Incorrect value'
    }
  }

  if (!error) {
    return true
  }
}
