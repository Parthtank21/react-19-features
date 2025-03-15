import React, { useActionState, useState } from "react";

// Dummy Login API Function
async function loginUser(data: {
  username: string;
  password: string;
}): Promise<{ status: number; msg: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === "user" && data.password === "pass") {
        resolve({ status: 200, msg: "User logged in successfully" });
      } else {
        reject({ status: 401, msg: "Invalid credentials" });
      }
    }, 2000);
  });
}

// Old Method - useState hook
const OldMethodComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<unknown>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setData(null);
    setError(null);
    setPending(true);

    try {
      const res = await loginUser({ username, password });
      setData(res);
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>Old Method - useState hook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" disabled={pending}>
          {pending ? "Loggin in" : "Login"}
        </button>
      </form>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
    </div>
  );
};

// New Method - useActionState hook
const NewMethodComponent = () => {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData: FormData) => {
      try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const res = await loginUser({ username, password });
        return { data: res, error: null };
      } catch (error) {
        return { data: null, error: error };
      }
    },
    {
      data: null,
      error: null,
    }
  );

  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>New Method - useActionState hook</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Enter username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" placeholder="Enter password" name="password" />
        </div>
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? "Loggin in" : "Login"}
        </button>
      </form>
      <p>Data: {JSON.stringify(state.data)}</p>
      <p>Error: {JSON.stringify(state.error)}</p>
    </div>
  );
};

export default function NewHook1() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <OldMethodComponent />
      <NewMethodComponent />
    </div>
  );
}
