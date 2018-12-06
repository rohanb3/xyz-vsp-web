export default {
  name: 'ConfigurableFooter',
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  computed: {
    preparedColumns() {
      const columns = this.columns.map((item, index) => {
        const style = {};

        if (item.width) {
          style.width = item.width;
        } else {
          style.flex = 1;
        }

        const machineName = (item.name || `column${index}`).toLowerCase().replace(/\W/g, '');

        return {
          ...item,
          _className: `column-${machineName}`,
          style,
        };
      });
      return columns;
    },
  },
};
