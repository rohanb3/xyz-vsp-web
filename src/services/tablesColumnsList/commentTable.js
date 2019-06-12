import i18n from '@/i18n';

export default () => [
  {
    name: 'Date/Time',
    field: 'createOn',
    title: i18n.t('date.time'),
    fieldType: 'date',
    class: 'text',
    width: '3',
    minWidth: '100px',
  },
  {
    name: 'userName',
    field: 'userName',
    title: i18n.t('author'),
    class: 'text',
    width: '3',
    minWidth: '100px',
  },
  {
    name: 'Comment',
    field: 'comment',
    title: i18n.t('comment'),
    class: 'text',
    width: '3',
    minWidth: '100px',
  },
];
