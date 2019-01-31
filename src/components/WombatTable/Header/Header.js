/* eslint-disable no-underscore-dangle */
import VueDraggableResizable from 'vue-draggable-resizable';
import VueDraggable from 'vuedraggable';

const RESIZER_WIDTH = 5;
const COLUMN_DEFAULT_MIN_WIDTH = 50;

export const HEADER_CELL_ELLIPSIS_NEVER = 'never';
export const HEADER_CELL_ELLIPSIS_ALWAYS = 'always';
export const HEADER_CELL_ELLIPSIS_SMART = 'smart';

export default {
  name: 'configurable-header',
  components: {
    VueDraggableResizable,
    VueDraggable,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    width: true,
    resize: {
      type: Boolean,
      default: true,
    },
    columnsReorder: {
      type: Boolean,
      default: true,
    },
    columnsEllipsisMode: {
      type: String,
      default: HEADER_CELL_ELLIPSIS_SMART,
    },
    name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      resizerPositions: {},
      columnsWidth: {},
      RESIZER_WIDTH,
    };
  },
  computed: {
    globalStyles() {
      return {
        width: this.width ? `${this.width}px` : '100%',
      };
    },
    isColumnsEllipsisModeAlways() {
      return this.columnsEllipsisMode === HEADER_CELL_ELLIPSIS_ALWAYS;
    },
    tableNameIdentificator() {
      return this.name ? `wombat-columns-styles-${this.name}` : 'wombat-columns-styles';
    },
    preparedColumns: {
      get() {
        const columns = this.columns.map((item, index) => {
          const _style = {};
          let _width;
          let _widthProportion;

          if (item.width && String(item.width).indexOf('px') >= 0) {
            _style.width = item.width;
            _width = parseInt(item.width, 10);
          } else {
            _style.flex = item.width || 1;
            _widthProportion = _style.flex;
          }
          const _minWidth = parseInt(item.minWidth || COLUMN_DEFAULT_MIN_WIDTH, 10);
          _style['min-width'] = `${_minWidth}px`;

          const _machineName = (item.name || `column${index}`).toLowerCase().replace(/\W/g, '');
          const _className = `column-${_machineName}`;

          return {
            ...item,
            _machineName,
            _className,
            _minWidth,
            _width,
            _widthProportion,
            _style,
          };
        });
        return columns;
      },
      set(columns) {
        this.$emit('columnsReordered', columns);
      },
    },
    columnsStyles() {
      const styles = {};

      (this.preparedColumns || []).forEach(column => {
        styles[column._className] = column._style;
      });

      return styles;
    },
  },
  watch: {
    columnsWidth: {
      handler() {
        this.checkResizerPositions();
        if (this.columnsEllipsisMode === HEADER_CELL_ELLIPSIS_SMART) {
          this.adjustColumnsEllipsis();
        }
      },
    },
    columnsStyles: {
      handler() {
        this.compileColumnsStyles();
        this.checkResizerPositions();
      },
      // deep: true,
      // immediate: true,
    },
    preparedColumns: 'checkColumnsWidth',
    width: 'checkColumnsWidth',
  },
  methods: {
    compileColumnsStyles() {
      const compiledStyles = Object.keys(this.columnsStyles)
        .map(className => {
          const styles = Object.keys(this.columnsStyles[className] || {})
            .map(prop => `${prop}: ${this.columnsStyles[className][prop]};`)
            // eslint-disable-next-line quotes
            .join('\n');

          return `.wombat-table .cell.${className} {
            ${styles}
          }`;
        })
        // eslint-disable-next-line quotes
        .join('\n');

      let stylesContainer =
        this.stylesContainer || document.querySelector(`#${this.tableNameIdentificator}`);

      if (!stylesContainer) {
        stylesContainer = document.createElement('STYLE');
        this.stylesContainer = stylesContainer;
        stylesContainer.id = this.tableNameIdentificator;
        document.querySelector('body').appendChild(stylesContainer);
      }

      stylesContainer.innerHTML = compiledStyles;
    },
    checkColumnsWidth() {
      this.$nextTick(() => {
        const widths = {};

        this.preparedColumns.forEach(column => {
          const columnEl = this.$el.querySelector(`.${column._className}`);

          if (columnEl) {
            widths[column.name] = columnEl.clientWidth;
          }
        });

        this.columnsWidth = widths;
      });
    },
    checkResizerPositions() {
      const resizerPositions = {};
      this.resizerPositions = {};

      Object.keys(this.columnsWidth).forEach(columnName => {
        resizerPositions[columnName] = this.columnsWidth[columnName] - RESIZER_WIDTH;
      });

      this.$nextTick(() => {
        this.resizerPositions = resizerPositions;
      });
    },
    onResizeFinish(column, newWidth) {
      let changes = {};

      const _newWidth = Math.abs(newWidth);

      if (column._width) {
        const width = column._minWidth > _newWidth ? column._minWidth : _newWidth;

        changes[column.name] = `${width}px`;
      } else {
        const allFluidColumns = this.preparedColumns.filter(item => !item._width);
        const fixedColumns = this.preparedColumns.filter(item => !!item._width);
        const otherFluidColumns = allFluidColumns.filter(item => item.name !== column.name);
        const fluidColumnsTotalWidth = allFluidColumns
          .map(item => this.columnsWidth[item.name])
          .reduce(this.totalReducer, 0);
        const otherFluidColumnsMinWidth = otherFluidColumns
          .map(item => item._minWidth || 0)
          .reduce(this.totalReducer, 0);

        let newFluidColumnsWidth;
        const columnMinWidth = column.minWidth || COLUMN_DEFAULT_MIN_WIDTH;

        if (_newWidth > this.resizerPositions[column.name]) {
          newFluidColumnsWidth = Math.max(
            fluidColumnsTotalWidth,
            _newWidth + otherFluidColumnsMinWidth
          );
        } else if (_newWidth < this.resizerPositions[column.name] && !otherFluidColumns.length) {
          newFluidColumnsWidth = _newWidth;
        } else if (_newWidth < this.resizerPositions[column.name] && _newWidth < columnMinWidth) {
          newFluidColumnsWidth = fluidColumnsTotalWidth - (columnMinWidth - _newWidth);
        } else {
          newFluidColumnsWidth = fluidColumnsTotalWidth;
        }
        const newOtherFluidColumnsWidth = newFluidColumnsWidth - _newWidth;

        changes = {
          [column.name]: Math.round((_newWidth / newFluidColumnsWidth) * 100),
          ...this.adjustFluidColumns(
            newFluidColumnsWidth,
            newOtherFluidColumnsWidth,
            otherFluidColumns
          ),
        };

        if (newFluidColumnsWidth !== fluidColumnsTotalWidth) {
          const newFixedColumnsWidth = this.width - _newWidth - newOtherFluidColumnsWidth;

          changes = {
            ...changes,
            ...this.adjustFixedColumns(newFixedColumnsWidth, fixedColumns),
          };
        }
      }

      if (Object.keys(changes).length) {
        this.$emit('columnsResized', changes);
      }
    },
    adjustFluidColumns(totalWidth, widthToAdjust, columns) {
      const changes = {};

      const totalProportion = columns
        .map(item => item._widthProportion || 0)
        .reduce(this.totalReducer, 0);

      columns.forEach(column => {
        const columnWidth = widthToAdjust * (column._widthProportion / totalProportion);
        changes[column.name] = Math.round((columnWidth / totalWidth) * 100);
      });

      return changes;
    },
    adjustFixedColumns(widthToAdjust, columns) {
      const changes = {};

      const totalWidth = columns.map(column => column._width).reduce(this.totalReducer, 0);

      columns.forEach(column => {
        const columnWidth = Math.max(
          Math.round((widthToAdjust * column._width) / totalWidth),
          column._minWidth
        );
        changes[column.name] = `${columnWidth}px`;
      });

      return changes;
    },
    totalReducer(total, item) {
      return total + item;
    },
    adjustColumnsEllipsis() {
      this.preparedColumns.forEach(column => {
        const columnRef = this.$refs[column._machineName][0];

        columnRef.classList.remove('header-column-ellipsis');

        if (columnRef.clientWidth < columnRef.scrollWidth) {
          columnRef.classList.add('header-column-ellipsis');
        }
      });
    },
    preventColumnDragging(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    },
  },
  mounted() {
    this.checkColumnsWidth();
    this.compileColumnsStyles();
    window.addEventListener('resize', this.checkColumnsWidth);
  },
  beforeDestroy() {
    document.querySelector(`#${this.tableNameIdentificator}`).remove();
  },
};

/* eslint-enable no-underscore-dangle */
