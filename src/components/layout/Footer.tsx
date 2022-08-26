import { FunctionComponent, ReactElement } from 'react';

type FooterProps = {
    leftContent?: string | ReactElement<any,any>,
    rightContent?: string | ReactElement<any,any>,

};

const Footer: FunctionComponent<FooterProps> = (props) => {
    if (!props.leftContent && !props.rightContent) {
        return null;
    }
    return <footer className="main-footer custom-theme">
        {props.rightContent && <div className="float-right d-none d-sm-inline">{props.rightContent}</div>}
        {props.leftContent && props.leftContent}
    </footer>
};

export default Footer;



