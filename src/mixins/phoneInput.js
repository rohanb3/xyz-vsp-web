import { mask } from 'vue-the-mask';
import { validatePhoneField, validateFieldCantBeEmpty } from '@/services/validators';

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    mask,
  },
  data: () => ({
    mask: '+1 (###) ###-####',
    phoneNumberRules: [validateFieldCantBeEmpty(), validatePhoneField()],
  }),
};
