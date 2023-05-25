const Signin = ({handleRoute}) => {
  return (
    <article className="br3 ba b--white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80 center">
          <div className="measure center flex-column">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center near-white">Sign In</legend>
              <div className="mt3 center flex-column">
                <label className="db fw6 lh-copy f6 center near-white" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
                  type="email"
                  name="email-address"
                  id="email-address"
                  // onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3 center flex-column">
                <label className="db fw6 lh-copy f6 center near-white" htmlFor="password">Password</label>
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
                className="b ph3 pv2 input-reset ba b--white near-white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3 center b--white-10">
              <p onClick={() => handleRoute('register')} className="f6 link dim black db pointer near-white">Register</p>
            </div>
          </div>
        </main>
      </article>
  )
}

export default Signin
