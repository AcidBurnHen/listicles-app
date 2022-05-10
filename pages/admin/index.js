import { useState } from "react";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleName = e => {
    setName(e.target.value);
  };

  const handlePass = e => {
    setPass(e.target.pass);
  };

  return (
    <div>
      <h1>Admin area</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input onChange={handleName} id="username" name="username" type="text" />
        <label htmlFor="username">Password</label>
        <input onChange={handlePass} id="password" name="password" type="password" />
      </form>
    </div>
  );
}
