import styled from "styled-components";
import { useState } from "react";

const MetricsSettings = () => {

    const [formData, setFormData] = useState({ //change to data that match API
        projectName: '',
        email: '',
        password: '',
        projectAddress: '',
        discord: '',
        twitter: '',
      })

    const updateMetrics = (e) => { //patch changes to db
        e.preventDefault();
    }

      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        })
      }

    return (
        <Form onSubmit={(e) => updateMetrics(e)}>
            <div style={{width: "47%"}}>
                <Label>
                    Project Name
                </Label>
                <Input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Project Name"
                />
                <Label>
                    Email
                </Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                />
                <Label>
                    Discord
                </Label>
                <Input
                    type="text"
                    name="discord"
                    value={formData.discord}
                    onChange={handleChange}
                    placeholder="https://discord.gg/dfs"
                />
            </div>
            <div style={{width: "47%"}}>
                <Label>
                    Project Address
                </Label>
                <Input
                    type="text"
                    name="projectAddress"
                    value={formData.projectAddress}
                    onChange={handleChange}
                    placeholder="0x..."
                />
                <Label>
                    Password
                </Label>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="*************"
                />
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button type="submit">Save</Button>
            </div>
        </Form>
    )
}

export default MetricsSettings;

const Form = styled.div`
    background-color: #1B1C28;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    padding: 3rem 3rem 4rem 3rem;
    width: 50rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 3rem;
`

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #A1A4BD;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 1.2rem;
  background-color: #181924;
`

const Button = styled.button`
  display: block;
  width: 80%;
  padding: 0.7rem;
  margin-top: 3rem;
  background-color: #3F61EC;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
 `

 const Label = styled.label`
    display: block;
    color: #67778F;
    font-size: 14px;
    margin-bottom: 8px;
`;
