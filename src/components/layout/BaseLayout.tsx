import Content from "../layout/Content";
import PropTypes from 'prop-types';
import { Component } from 'react'

class BaseLayout extends Component<any> {
    render() {
        return (
            <div className={`content-wrapper custom-theme`}>
                <Content title={this.props.contentTitle} titleButton={this.props.contentTitleButton}>
                    {this.props.children}
                </Content>
            </div>
        )
    }
}

export default BaseLayout;