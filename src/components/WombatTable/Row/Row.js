export default {
  name: 'configurable-row',
  props: {
    height: true,
    item: {
      type: Object,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  computed: {
    styles() {
      const styles = {};

      if (this.height) {
        styles.height = `${this.height}px`;
        styles.lineHeight = `${this.height}px`;
      }

      return styles;
    },
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
          style,
          _className: `column-${machineName}`,
        };
      });
      return columns;
    },
  },
};
