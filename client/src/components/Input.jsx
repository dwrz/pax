import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText, getUrlAnalysis, getTextAnalysis } from '../actions/analyzerActions';
import InputURL from './InputURL.jsx';
import InputText from './InputText.jsx';

@connect((store) => {
  return {
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
    input: store.analyzer.input,
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
    visible: store.user.inputView,
  };
}) export default class Input extends React.Component {
  static handleKeyUp(e) {
    e.preventDefault();
  }

  textToggleHandle() {
    this.props.dispatch(toggleUrlText(this.props.analyzeUrl));
  }

  checkInput() {
    const value = escape(document.getElementById('input').value);
    if (value === '') {
      alert('Please enter a URL or text to analyze.');
    } else {
      this.analyzeHandle();
    }
  }

  analyzeHandle() {
    const value = document.getElementById('input').value;
    if (this.props.analyzeUrl) {
      this.props.dispatch(getUrlAnalysis(value));
    } else {
      this.props.dispatch(getTextAnalysis(value));
    }
  }

  render() {
    return this.props.visible && (
      <div className="container padTop center-text">
        <InputURL
          display={this.props.analyzeUrl}
          checkInput={this.checkInput.bind(this)}
          textToggleHandle={this.textToggleHandle.bind(this)}
          handleKeyUp={Input.handleKeyUp}
        />
        <InputText
          display={this.props.analyzeUrl}
          checkInput={this.checkInput.bind(this)}
          textToggleHandle={this.textToggleHandle.bind(this)}
          handleKeyUp={Input.handleKeyUp.bind(this)}
        />
      </div>
    );
  }
}
