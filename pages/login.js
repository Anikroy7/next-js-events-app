import { useDispatch } from "react-redux";
import { loginUser, loginUserWithGoogle } from "../src/components/features/atuh/authSlice";

const login = () => {
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(loginUserWithGoogle())
  }
  const handleLoginUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    console.log(name, password, email);
    // dispatch create user action
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <form onSubmit={handleLoginUser}>
          <label for="fname">Email</label><br />
          <input type="text" id="fname" name="fname" /><br /><br />
          <label for="password">Password</label><br />
          <input type="text" id="password" name="password" /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <button onClick={handleLogin}>Sign In with Google</button>
      <style jsx>{`
          .container {
            margin: 50px;
          }
          p {
            color: blue;
          }
          input{
            padding: 10px;
            margin-bottom:5px
          }
          h2{
            margin-bottom:20px;
          }
        `}</style>
    </div >
  );
};

export default login;