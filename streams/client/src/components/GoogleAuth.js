import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
    console.log('before API this',this);
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '606158151772-v63jg28eivu71o9fjphvsqa0l42jp2i7.apps.googleusercontent.com',
                    scope: 'email'
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    console.log('after API this',this)
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        })
    }

    onAuthChange = isSignedIn => {
        console.log('this',this);
        console.log('this.props',this.props);
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
            Sign Out
            </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

// 要使用 connect()，你需要定義一個名為 mapStateToProps 的特別 function，它述說將如何轉換目前 Redux store state 成為你想要傳到正在包裝的 presentational component 的 props
// 也就是直接把 isSignedIn 注入 GoogleAuth Component 的 props,當你把props console 出來時, isSignedIn 已經存在且可以隨時使用
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);