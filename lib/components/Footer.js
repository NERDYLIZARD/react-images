'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props, context) {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).call(this, props, context);
    this.state = {
      caption: this.props.caption,
      editing: false
    };
    this.saveCaption = this.saveCaption.bind(this);
  }

  _createClass(Footer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props === nextProps) return;
      this.setState({
        editing: false,
        caption: nextProps.caption
      });
    }
  }, {
    key: 'saveCaption',
    value: function saveCaption() {
      this.props.onUpdateCaption(this.state.caption);
      this.setState({ editing: false });
    }
  }, {
    key: 'renderCaptionForm',
    value: function renderCaptionForm(classes) {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('input', {
          autoFocus: true,
          type: 'text',
          value: this.state.caption,
          onChange: function (e) {
            return _this.setState({ caption: e.target.value });
          }
        }),
        _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'button',
            { onClick: this.saveCaption },
            'Save'
          ),
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.setState({ editing: false });
              } },
            'Cancel'
          )
        )
      );
    }
  }, {
    key: 'renderImageCount',
    value: function renderImageCount(classes) {
      var _props = this.props;
      var showCount = _props.showCount;
      var countCurrent = _props.countCurrent;
      var countSeparator = _props.countSeparator;
      var countTotal = _props.countTotal;

      return showCount ? _react2['default'].createElement(
        'div',
        { className: (0, _aphroditeNoImportant.css)(classes.footerCount) },
        countCurrent,
        countSeparator,
        countTotal
      ) : _react2['default'].createElement('span', null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var caption = _props2.caption;
      var showCount = _props2.showCount;

      if (!caption && !showCount) return null;

      var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, this.context.theme));

      return _react2['default'].createElement(
        'div',
        _extends({ className: (0, _aphroditeNoImportant.css)(classes.footer) }, this.props),
        caption ? _react2['default'].createElement(
          'figcaption',
          { className: (0, _aphroditeNoImportant.css)(classes.footerCaption) },
          !this.state.editing ? _react2['default'].createElement(
            'div',
            null,
            caption,
            _react2['default'].createElement(
              'button',
              { onClick: function () {
                  return _this2.setState({ editing: true });
                } },
              'Edit'
            )
          ) : this.renderCaptionForm(classes)
        ) : _react2['default'].createElement('span', null),
        this.renderImageCount(classes)
      );
    }
  }]);

  return Footer;
})(_react2['default'].Component);

Footer.propTypes = {
  caption: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
  countCurrent: _propTypes2['default'].number,
  countSeparator: _propTypes2['default'].string,
  countTotal: _propTypes2['default'].number,
  showCount: _propTypes2['default'].bool
};
Footer.contextTypes = {
  theme: _propTypes2['default'].object.isRequired
};

var defaultStyles = {
  footer: {
    boxSizing: 'border-box',
    color: _theme2['default'].footer.color,
    cursor: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    lineHeight: 1.3,
    paddingBottom: _theme2['default'].footer.gutter.vertical,
    paddingLeft: _theme2['default'].footer.gutter.horizontal,
    paddingRight: _theme2['default'].footer.gutter.horizontal,
    paddingTop: _theme2['default'].footer.gutter.vertical
  },
  footerCount: {
    color: _theme2['default'].footer.count.color,
    fontSize: _theme2['default'].footer.count.fontSize,
    paddingLeft: '1em' },
  // add a small gutter for the caption
  footerCaption: {
    flex: '1 1 0'
  }
};

module.exports = Footer;