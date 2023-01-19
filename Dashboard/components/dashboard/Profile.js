import Image from "next/image";
import styled from "styled-components";
import PageHeader from "../common/PageHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../components/modals/index";
import MetricsSettings from "../settings/MetricsSettings";
import StyleSettings from "../settings/StyleSettings";
import ContentContainer from "../common/ContentContainer";

const Profile = () => {
  const [toggleOption, setToggleOption] = useState("Metrics Settings");
  const router = useRouter();
  const { projectAddress } = router.query;
  const [project, setProject] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data: project } = await api.get(`/project/${projectAddress}`);
        setProject(project);
        console.log(project);
      } catch (e) {}
    };

    fetchProject();
  }, []);

  return (
    <ContentContainer>
      <div style={{ display: "flex", alignItems: "center", height: "3rem" }}>
        <PageHeader>Profile</PageHeader>
        <ProjectName>{project.projectName}</ProjectName>
      </div>
      <NavigationBar>
        <div>
          <Toggle
            onClick={() => setToggleOption("Metrics Settings")}
            className={`${
              toggleOption === "Metrics Settings"
                ? "border-b-2 border-[#3F61EC]"
                : ""
            }`}
          >
            <ToggleText>Metrics Settings</ToggleText>
          </Toggle>
          <Toggle
            onClick={() => setToggleOption("Style Settings")}
            className={`${
              toggleOption === "Style Settings"
                ? "border-b-2 border-[#3F61EC]"
                : ""
            }`}
          >
            <ToggleText>Style Settings</ToggleText>
          </Toggle>
        </div>
      </NavigationBar>
      {toggleOption === "Metrics Settings" && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <MetricsSettings />
        </div>
      )}
      {toggleOption === "Style Settings" && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <StyleSettings />
        </div>
      )}
    </ContentContainer>
  );
};

export default Profile;

const NavigationBar = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  height: 4rem;
  border-bottom: 2px solid #24263c;
  justify-content: space-between;
`;

const Toggle = styled.button`
  padding: 1rem 3rem 1rem 3rem;
  height: 100%;
  margin: 0 1rem 0 0rem;
`;

const ToggleText = styled.p``;
const NewButton = styled.button`
  background-color: #3f61ec;
  border-radius: 5px;
  padding: 0.5rem 2rem 0.5rem 2rem;
  height: 2.5rem;
`;
const ProjectName = styled.p`
  color: #464a6c;
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;
