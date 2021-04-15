import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:
                '606158151772-v63jg28eivu71o9fjphvsqa0l42jp2i7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()})
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        }else if (this.state.isSignedIn) {
            return <div>I am signed in!</div>
        }else {
            return <div>I am not signed in</div>
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;