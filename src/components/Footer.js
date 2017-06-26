import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import defaults from '../theme';
import { deepMerge } from '../utils';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      caption: this.props.caption,
      editing: false
    };
    this.saveCaption = this.saveCaption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) return;
    this.setState({
      editing: false,
      caption: nextProps.caption
    });
  }

  saveCaption() {
    this.props.onUpdateCaption(this.state.caption);
    this.setState({ editing: false });
  }

  renderCaptionForm(classes) {
    return (
      <div>
        <input
          autoFocus
          type="text"
          value={this.state.caption}
          onChange={(e) => this.setState({ caption: e.target.value })}
        />
        <span>
          <button onClick={this.saveCaption}>Save</button>
          <button onClick={() => this.setState({ editing: false })}>Cancel</button>
        </span>
      </div>
    );
  }

  renderImageCount(classes) {
  	const { showCount, countCurrent, countSeparator, countTotal } = this.props;
    return showCount ? (
      <div className={css(classes.footerCount)}>
        {countCurrent}
        {countSeparator}
        {countTotal}
      </div>)
      : <span />;
  }

  render() {
    const { caption, showCount } = this.props;

    if (!caption && !showCount) return null;

    const classes = StyleSheet.create(deepMerge(defaultStyles, this.context.theme));

    return (
      <div className={css(classes.footer)} {...this.props}>
        <figcaption className={css(classes.footerCaption)}>
          {this.state.editing ?
            this.renderCaptionForm(classes) :
            <div>
              {caption}
              <button onClick={() => this.setState({ editing: true })}>Edit</button>
            </div>
          }
        </figcaption>
        {this.renderImageCount(classes)}
      </div>
  	);
  }

}


Footer.propTypes = {
	caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	countCurrent: PropTypes.number,
	countSeparator: PropTypes.string,
	countTotal: PropTypes.number,
	showCount: PropTypes.bool,
};
Footer.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	footer: {
		boxSizing: 'border-box',
		color: defaults.footer.color,
		cursor: 'auto',
		display: 'flex',
		justifyContent: 'space-between',
		left: 0,
		lineHeight: 1.3,
		paddingBottom: defaults.footer.gutter.vertical,
		paddingLeft: defaults.footer.gutter.horizontal,
		paddingRight: defaults.footer.gutter.horizontal,
		paddingTop: defaults.footer.gutter.vertical,
	},
	footerCount: {
		color: defaults.footer.count.color,
		fontSize: defaults.footer.count.fontSize,
		paddingLeft: '1em', // add a small gutter for the caption
	},
	footerCaption: {
		flex: '1 1 0',
	},
};

module.exports = Footer;
