import i18n from '@/i18n';

export const getCustomersTableColumns = () => [
  {
    name: 'company',
    field: 'company',
    title: i18n.t('company'),
    width: '300px',
  },
  {
    name: 'contactPerson',
    field: 'contactPerson',
    class: 'text',
    title: i18n.t('contact.person'),
  },
  {
    name: 'email',
    field: 'email',
    fieldType: 'email',
    class: 'text',
    title: i18n.t('email'),
  },
  {
    name: 'phone',
    field: 'phone',
    class: 'text',
    title: i18n.t('phone'),
    width: '150px',
  },
  {
    name: 'lastPayment',
    field: 'lastPayment',
    fieldType: 'lastPayment',
    title: i18n.t('last.payment'),
  },
  {
    name: 'amount',
    field: 'amount',
    title: i18n.t('amount'),
    class: 'number',
    width: '100px',
  },
  {
    name: 'additional',
    field: null,
    fieldType: 'additional',
    title: '',
    width: '100px',
  },
];

export const getCallsTableColumns = () => [
  {
    name: 'date',
    field: 'date',
    fieldType: 'date',
    title: i18n.t('date'),
    class: 'text',
  },
  {
    name: 'operator',
    field: 'operator',
    class: 'text',
    title: i18n.t('operator'),
  },
  {
    name: 'retailers',
    field: 'retailers',
    class: 'text',
    title: i18n.t('retailers'),
  },
  {
    name: 'type',
    field: 'type',
    fieldType: 'type',
    class: 'text',
    title: i18n.t('type'),
    width: '100px',
  },
  {
    name: 'disposition',
    field: 'disposition',
    fieldType: 'disposition',
    class: 'text',
    title: i18n.t('disposition'),
  },
  {
    name: 'waitTime',
    field: 'waitTime',
    fieldType: 'waitTime',
    title: i18n.t('wait.time'),
    class: 'number',
  },
  {
    name: 'duration',
    field: 'duration',
    fieldType: 'duration',
    title: i18n.t('duration'),
    width: '100px',
  },
  {
    name: 'rating',
    field: 'rating',
    fieldType: 'rating',
    title: i18n.t('rating'),
    width: '60px',
  },
  {
    name: 'status',
    field: 'status',
    fieldType: 'status',
    title: i18n.t('status'),
    class: 'text',
    width: '100px',
  },
  {
    name: 'clientFeedback',
    field: 'clientFeedback',
    fieldType: 'clientFeedback',
    title: i18n.t('client'),
    width: '80px',
  },
  {
    name: 'operatorFeedback',
    field: 'operatorFeedback',
    fieldType: 'operatorFeedback',
    title: i18n.t('operator'),
    width: '80px',
  },
];

export const getOperatorsTableColumns = () => [
  {
    name: 'id',
    field: 'id',
    fieldType: 'id',
    class: 'text',
    title: i18n.t('id'),
    width: '100px',
  },
  {
    name: 'name',
    field: 'name',
    fieldType: 'name',
    class: 'text',
    title: i18n.t('name'),
    width: '250px',
  },
  {
    name: 'department',
    field: 'department',
    class: 'text',
    title: i18n.t('department'),
    width: '200px',
  },
  {
    name: 'score',
    field: 'score',
    fieldType: 'score',
    class: 'text',
    title: i18n.t('score'),
    width: '60px',
  },
  {
    name: 'calls',
    field: 'calls',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('calls'),
    width: '100px',
  },
  {
    name: 'info',
    field: 'info',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('info'),
    width: '100px',
  },
  {
    name: 'help',
    field: 'help',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('help'),
    width: '100px',
  },
  {
    name: 'sale',
    field: 'sale',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('sale'),
    width: '100px',
  },
  {
    name: 'wrapUpTime',
    field: 'wrapUpTime',
    class: 'text',
    fieldType: 'wrapUpTime',
    title: i18n.t('wrap.up.time'),
    width: '150px',
  },
  {
    name: 'rating',
    field: 'rating',
    fieldType: 'rating',
    title: i18n.t('rating'),
    class: 'text',
    width: '100px',
  },
  {
    name: 'positive',
    field: 'positive',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('positive'),
    width: '100px',
  },
  {
    name: 'negative',
    field: 'negative',
    fieldType: 'calls',
    class: 'text',
    title: i18n.t('negative'),
    width: '100px',
  },
  {
    name: 'qtyOfReviews',
    field: 'qtyOfReviews',
    fieldType: 'qtyOfReviews',
    class: 'text',
    title: i18n.t('qty.of.reviews'),
    width: '150px',
  },
  {
    name: 'lastReview',
    field: 'lastReview',
    fieldType: 'lastReview',
    class: 'text',
    title: i18n.t('last.review'),
    width: '150px',
  },
  {
    name: 'additional',
    field: null,
    fieldType: 'additional',
    title: '',
    width: '70px',
  },
];