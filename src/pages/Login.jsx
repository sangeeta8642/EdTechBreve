//user login page
import { useState } from "react";
import { auth, db, provider, signInWithPopup } from "../server/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import sendWelcomeEmail from "../components/sendWelcomeEmail";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  //function to accept the user from google
  const GoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    
      console.log("User signed in");
    
      nav("/");
      alert("login successfull");
      localStorage.setItem("user", "user logged in");
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to signin: " + err.message);
      alert(err.message);
      console.log(err.message);
    }
  };

  //manually accepting the user
  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      } else {
        console.log("No user data found in Firestore.");
      }
      // const handsend = await sendWelcomeEmail(userDoc.data().email)
      // console.log("hand sen d"+handsend);
      
      alert("Login Successful");
      localStorage.setItem("user", JSON.stringify(userDoc.data()));

      // nav("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Failed to log in: " + err.message);
      alert(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[100vw] h-[100vh] flex justify-center items-center">
      <form
        onSubmit={Login}
        className="flex flex-col items-center justify-evenly w-full lg:w-[50%] h-[50%]"
      >
        <div className="flex w-[80%] justify-start items-start">
          <button className="lg:mr-[160px] md:mr-[160px] sm:mr-[160px] mr-[100px] text-xl" onClick={()=>nav('/')}> <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                clip-rule="evenodd"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                clip-rule="evenodd"
              ></path>
            </svg></button>
          <h2 className="text-5xl font-bold ">Login</h2>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md text-2xl"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-[80%] h-10 bg-green-500 text-2xl rounded-md"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <p className="text-2xl">
          Not a member?{" "}
          <a href="/signup" className="text-green-800">
            Signup
          </a>
        </p>
        OR
        <button
          onClick={GoogleSignIn}
          className="mt-4 text-xl text-black p-2 w-[80%] flex justify-center items-center gap-4 border-4 border-black rounded-full"
        >

          {/* Google Logo */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
            enable-background="new 0 0 48 48"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <p>Sign in with Google</p>
        </button>
      </form>
    </main>
  );
};

export default Login;

