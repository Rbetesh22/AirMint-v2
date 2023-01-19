import styled from "styled-components";
import ModalBackground from "./ModalBackground";
import api from "../../components/modals/index";
import { useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../common/Loader";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/signin", { email, password });
      localStorage.setItem("token", "Bearer " + response.data.token);
      router.push(`dashboard/${response.data.project.projectAddress}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <ModalBackground onClose={onClose} closeable={true}>
      <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div>
          <Label>Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button type="submit">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : (
              <p>Sign in</p>
            )}
          </Button>
        </div>
      </Form>
    </ModalBackground>
  );
};

export default LoginModal;

const Form = styled.form`
  background-color: #1b1c28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 30rem;
  cursor: auto;
`;

const Label = styled.label`
  display: block;
  color: #67778f;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #a1a4bd;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 16px;
  background-color: #181924;
`;

const Button = styled.button`
  display: block;
  width: 80%;
  height: 3rem;
  margin-top: 3rem;
  background-color: #3f61ec;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;
