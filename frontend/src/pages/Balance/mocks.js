export const columnsAllProposals = [
  {
    key: 'id',
    title: '#',
    width: 48,
  },
  {
    key: 'summary',
    title: 'Summary',
    width: 605,
  },
  {
    key: 'status',
    title: 'Status',
    width: 223,
  },
  {
    key: 'voting',
    title: 'Voting',
    width: 223,
  },
  {
    key: 'date',
    title: 'Date',
    width: 223,
  },
]

export const dataAllProposals = [
  {
    id: '1',
    summary: 'Proposal',
    status: 'Pending',
    voting: 'voting1',
    date: 'date1',
  },
  {
    id: '2',
    summary: 'Proposal',
    status: 'Active',
    voting: 'voting2',
    date: 'date2',
  },
  {
    id: '3',
    summary: 'Proposal',
    status: 'Succeeded',
    voting: 'voting3',
    date: 'date3',
  },
  {
    id: '4',
    summary: 'Proposal',
    status: 'Canceled',
    voting: 'voting4',
    date: 'date4',
  },
  {
    id: '5',
    summary: 'Proposal',
    status: 'Failed',
    voting: 'voting5',
    date: 'date5',
  },
  {
    id: '6',
    summary: 'Proposal',
    status: 'Queued',
    voting: 'voting6',
    date: 'date6',
  },
  {
    id: '7',
    summary: 'Proposal',
    status: 'Executed',
    voting: 'voting7',
    date: 'date7',
  },
  {
    id: '8',
    summary: 'Proposal',
    status: 'Expired',
    voting: 'voting8',
    date: 'date8',
  },
]

export const columnsLockedTokens = [
  {
    key: 'id',
    title: '#',
    width: 48,
  },
  {
    key: 'summary',
    title: 'Summary',
    width: 608,
  },
  {
    key: 'myvote',
    title: 'My Vote',
    width: 285,
  },
  {
    key: 'status',
    title: 'Status',
    width: 285,
  },
  {
    key: 'voting',
    title: 'Voting',
    width: 285,
  },
  {
    key: 'date',
    title: 'Date',
    width: 285,
  },
  {
    key: 'unlockTokens',
    title: 'Unlock Tokens',
    width: 285,
  },
]

export const dataLockedTokens = [
  {
    id: '1',
    summary: 'Proposal with active voting',
    myvote: 'Vote1',
    status: 'Active',
    voting: 'voting1',
    date: 'date1',
  },
  {
    id: '2',
    summary: 'Passed proposal',
    myvote: 'Vote2',
    status: 'Succeeded',
    voting: 'voting2',
    date: 'date2',
  },
  {
    id: '3',
    summary: 'Successfully executed proposal',
    myvote: 'Vote1',
    status: 'Executed',
    voting: 'voting1',
    date: 'date1',
  },
  {
    id: '4',
    summary: 'Proposal',
    myvote: 'Vote1',
    status: 'Pending',
    voting: 'voting1',
    date: 'date1',
  },
  {
    id: '5',
    summary: 'Proposal',
    myvote: 'Vote1',
    status: 'Pending',
    voting: 'voting1',
    date: 'date1',
  },
]

export const columnsVoters = [
  {
    key: 'id',
    title: 'Rank',
    width: 48,
  },
  {
    key: 'addresses',
    title: 'Addresses',
    width: 608,
  },
  {
    key: 'votes',
    title: 'Votes',
    width: 285,
  },
  {
    key: 'voteWeight',
    title: 'Vote weight',
    width: 285,
  },
  {
    key: 'proposalsVoted',
    title: 'Proposals voted',
    width: 285,
  },
]

export const dataVoters = [
  {
    id: '1',
    addresses: 'Proposal',
    votes: '123 000.72',
    voteWeight: '13.14%',
    proposalsVoted: '1',
  },
  {
    id: '2',
    addresses: 'Proposal',
    votes: '123 000.72',
    voteWeight: '9.78%',
    proposalsVoted: '5',
  },
  {
    id: '3',
    addresses: 'Proposal',
    votes: '91 548.48',
    voteWeight: '4.23%',
    proposalsVoted: '10',
  },
  {
    id: '4',
    addresses: 'Proposal',
    votes: '91 548.48',
    voteWeight: '4.23%',
    proposalsVoted: '21',
  },
  {
    id: '5',
    addresses: 'Proposal',
    votes: '91 548.48',
    voteWeight: '4.23%',
    proposalsVoted: '11',
  },
  {
    id: '6',
    addresses: 'Proposal',
    votes: '44 931.77',
    voteWeight: '9.78%',
    proposalsVoted: '10',
  },
  {
    id: '7',
    addresses: 'Proposal',
    votes: '39 596.12',
    voteWeight: '9.78%',
    proposalsVoted: '2',
  },
]
