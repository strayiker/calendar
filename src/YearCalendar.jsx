import React from 'react';
import createReactClass from 'create-react-class';
import KeyCode from 'rc-util/lib/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';

const YearCalendar = createReactClass({
  mixins: [CommonMixin, CalendarMixin],

  getInitialState() {
    return { mode: 'year' };
  },

  onKeyDown(event) {
    const keyCode = event.keyCode;
    const ctrlKey = event.ctrlKey || event.metaKey;
    const stateValue = this.state.value;
    const { disabledDate } = this.props;
    let value = stateValue;
    switch (keyCode) {
      case KeyCode.DOWN:
        value = stateValue.clone();
        value.add(3, 'years');
        break;
      case KeyCode.UP:
        value = stateValue.clone();
        value.add(-3, 'years');
        break;
      case KeyCode.LEFT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.add(-10, 'years');
        } else {
          value.add(-1, 'years');
        }
        break;
      case KeyCode.RIGHT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.add(10, 'years');
        } else {
          value.add(1, 'years');
        }
        break;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(stateValue)) {
          this.onSelect(stateValue);
        }
        event.preventDefault();
        return 1;
      default:
        return undefined;
    }
    if (value !== stateValue) {
      this.setValue(value);
      event.preventDefault();
      return 1;
    }
  },

  handlePanelChange(_, mode) {
    if (mode && mode !== 'month') {
      this.setState({ mode });
    }
  },

  render() {
    const { props, state } = this;
    const { mode, value } = state;
    const children = (
      <div className={`${props.prefixCls}-year-calendar-content`}>
        <div className={`${props.prefixCls}-year-header-wrap`}>
          <CalendarHeader
            prefixCls={props.prefixCls}
            mode={mode}
            value={value}
            locale={props.locale}
            disabledYear={props.disabledDate}
            onYearSelect={this.onSelect}
            onValueChange={this.setValue}
            onPanelChange={this.handlePanelChange}
          />
        </div>
        <CalendarFooter
          prefixCls={props.prefixCls}
          renderFooter={props.renderFooter}
        />
      </div>
    );
    return this.renderRoot({
      className: `${props.prefixCls}-year-calendar`,
      children,
    });
  },
});

export default YearCalendar;
