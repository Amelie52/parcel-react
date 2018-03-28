// @flow
import * as React from 'react';
import { render } from 'react-dom';
import '../scss/style.scss';

type Props = {
    title: string
}

export class App extends React.Component<Props> {
    static defaultProps = {
        title: 'coucou',
    };

    render() {
        const { title } = this.props;

        return (
            <div>
                {title}
            </div>
        )
    }
}

const app = document.getElementById('app');

if (app == null) {
    throw new Error("no app element");
}

render(
    <App />,
    app
);

