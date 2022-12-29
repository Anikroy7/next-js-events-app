import { useDispatch } from "react-redux";
import { createUser, loginUserWithGoogle } from "../src/components/features/atuh/authSlice";

const signup = () => {
    const dispatch = useDispatch();
    const handleCreateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const password = event.target.password.value;
        const email = event.target.email.value;
        console.log(name, password, email);
        // dispatch create user action
        dispatch(createUser({ email, password }))
    }

    return (
        <div className="container">
            <h2>Signup</h2>

            <form onSubmit={handleCreateUser}>
                <label htmlFor="fname">First name:</label><br />
                <input type="text" id="name" name="name" /><br />
                <label htmlFor="email">Email</label><br />
                <input type="text" id="email" name="email" /><br /><br />
                <label htmlFor="email">Password</label><br />
                <input type="text" id="password" name="password" /><br />
                <input type="submit" value="Submit" />
            </form>

            <button onClick={() => dispatch(loginUserWithGoogle())}>Signup With Google</button>
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
        </div>
    );
};

export default signup;