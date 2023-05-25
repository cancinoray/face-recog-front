const Register = ({handleRoute}) => {
  return (
    <article className="br3 ba b--white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80 center near-white">
          <div className="measure center flex-column">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3 center flex-column">
              <label className="db fw6 lh-copy f6 center" htmlFor="email-address">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
                type="text"
                name="name"
                id="name"
                // onChange={this.onEmailChange}
              />
            </div>
              <div className="mt3 center flex-column">
                <label className="db fw6 lh-copy f6 center" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
                  type="email"
                  name="email-address"
                  id="email-address"
                  // onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3 center flex-column">
                <label className="db fw6 lh-copy f6 center" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
                  type="password"
                  name="password"
                  id="password"
                  // onChange={this.onPasswordChange}
                />
              </div>
            </div>
            <div className="center">
              <input
                onClick={() => handleRoute('home')}
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib near-white"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
  )
}

export default Register
