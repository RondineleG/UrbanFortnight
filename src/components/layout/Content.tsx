import { FunctionComponent } from 'react';

type ContentProps = {
  className?: string,
  title?: string,
  titleButton?: string,
  children?: any,
  contentTitle?: string
};

const Content: FunctionComponent<ContentProps> = (props: any) => {
    return <div className="wrapper">
        <div className="container-header">
            {props.title && <div className="container-fluid ">
                <div className="row mb-2">
                    <div className="col-sm-10">
                        <h1 className="m-0">{props.title}</h1>
                    </div>
                    <div className="col-sm-2 text-right text-muted">
                        {props.titleButton && props.titleButton}
                    </div>
                </div>
            </div>}
        </div>
        <section className="content">
            <div className="container-fluid">
                {props.children}
            </div>
        </section>
    </div>
};

export default Content;