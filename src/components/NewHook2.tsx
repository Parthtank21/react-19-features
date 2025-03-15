// https://react.dev/reference/react-dom/hooks/useFormStatus

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

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

const CustomBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loggin in" : "Login"}
    </button>
  );
};

export default function NewHook2() {
  const [state, formAction] = useActionState(
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
      <h2>New Method - useFormStatus hook</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Enter username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" placeholder="Enter password" name="password" />
        </div>
        <CustomBtn />
        <br />
      </form>
      <p>Data: {JSON.stringify(state.data)}</p>
      <p>Error: {JSON.stringify(state.error)}</p>
    </div>
  );
}
