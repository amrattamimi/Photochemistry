import { withRouter } from "react-router-dom";
import { Component } from "react";

// a workaround code to restore the scroll to top of the page when navigated
//function resource https://redux-form.com/8.3.0/docs/api/props.md/

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop)