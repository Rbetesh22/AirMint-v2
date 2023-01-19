import styled from "styled-components";
import ModalBackground from "./ModalBackground";
import api from "../../components/modals/index";
import { useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../common/Loader";

const SigninModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    email: "",
    password: "",
    projectAddress: "",
    discord: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/signup", formData);
      console.log(response.data);
      localStorage.setItem("token", "Bearer " + response.data.token);
      localStorage.setItem("project", response.data.project);
      router.push(`dashboard/${response.data.project.projectAddress}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <ModalBackground onClose={onClose} closeable={true}>
      <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: "47%" }}>
          <Label>Project Name</Label>
          <Input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
          />
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
          />
          <Label>Discord</Label>
          <Input
            type="text"
            name="discord"
            value={formData.discord}
            onChange={handleChange}
            placeholder="https://discord.gg/dfs"
          />
        </div>
        <div style={{ width: "47%" }}>
          <Label>Project Address</Label>
          <Input
            type="text"
            name="projectAddress"
            value={formData.projectAddress}
            onChange={handleChange}
            placeholder="0x..."
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="*************"
          />
          <Label>Twitter</Label>
          <Input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/twitter"
          />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
              <p>Sign up</p>
            )}
          </Button>
        </div>
      </Form>
    </ModalBackground>
  );
};

export default SigninModal;

const Label = styled.label`
  display: block;
  color: #67778f;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Form = styled.form`
  background-color: #1b1c28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 35rem;
  cursor: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #a1a4bd;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 1.2rem;
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
