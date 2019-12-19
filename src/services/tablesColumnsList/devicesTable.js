import { DEVICE_LIST_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'tenant',
    field: 'tenant.name',
    fieldType: 'name',
    title: 'tenant',
    class: 'text',
    width: '2',
    minWidth: '50px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.TENANT,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'company',
    field: 'company.companyName',
    fieldType: 'company',
    title: 'company',
    width: '2',
    class: 'text',
    minWidth: '50px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.COMPANY_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'branch',
    field: 'branch.branchName',
    fieldType: 'branch',
    title: 'branch.name',
    width: '2',
    class: 'text',
    minWidth: '65px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.BRANCH_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'name',
    field: 'deviceName',
    fieldType: 'deviceName',
    title: 'device.name',
    class: 'text',
    width: '2',
    minWidth: '50px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.DEVICE_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'loggedInAs',
    field: 'loggedInAs.displayName',
    fieldType: 'loggedInAs',
    title: 'user.login',
    width: '1',
    class: 'text',
    minWidth: '40px',
    placeholder: '-',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.LOGGED_IN_AS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'status',
    field: 'isOnline',
    fieldType: 'status',
    class: 'text',
    title: 'Status',
    width: '2',
    minWidth: '60px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.IS_ONLINE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'locationStatus',
    field: 'isInLocation',
    fieldType: 'locationStatus',
    class: 'text',
    title: 'location.status',
    width: '1',
    minWidth: '50px',
  },
  {
    name: 'comments',
    field: 'comments',
    fieldType: 'comments',
    title: 'comments',
    width: '1',
  },
  {
    name: 'statusSince',
    field: 'statusSince',
    fieldType: 'statusSince',
    title: 'status.timestamp',
    width: '2',
    class: 'text',
    minWidth: '80px',
    sortingFieldName: DEVICE_LIST_COLUMNS_SORTED.STATUS_SINCE,
    fieldHeaderType: 'sortingHeader',
  },
];
