export const getState = (data) => {
  let state
  if (data.state_ == 0) {
    state = 'Pending'
  } else if (data.state_ == 1) state = 'Active'
  else if (data.state_ == 2) state = 'Canceled'
  else if (data.state_ == 3) state = 'Failed'
  else if (data.state_ == 4) state = 'Succeeded'
  else if (data.state_ == 5) state = 'Expired'
  else if (data.state_ == 6) state = 'Queued'
  else if (data.state_ == 7) state = 'Executed'
  else state = 'Unknown'
  return state
}
