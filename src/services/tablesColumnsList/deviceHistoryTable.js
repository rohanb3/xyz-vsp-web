export default () => [
  {
    name: 'createdOn',
    field: 'createdOncreatedOn',
    fieldType: 'createdOn',
    title: 'status.since',
    width: '2',
    class: 'text',
    minWidth: '20px',
  },
  {
    name: 'status',
    field: 'isOnline',
    fieldType: 'status',
    class: 'text',
    title: 'status',
    width: '1',
    minWidth: '20px',
  },
  {
    name: 'locationStatus',
    field: 'isInLocation',
    fieldType: 'locationStatus',
    class: 'text',
    title: 'location.status',
    width: '2',
    minWidth: '20px',
  },
  {
    name: 'deviceLocation',
    fieldType: 'deviceLocation',
    title: 'device.location.with.hint',
    width: '2',
    minWidth: '20px',
  },
  {
    name: 'branchLocation',
    fieldType: 'branchLocation',
    title: 'branch.location.with.hint',
    width: '2',
    minWidth: '20px',
  },
];