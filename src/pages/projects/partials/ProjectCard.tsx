import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { IndexProject } from "../../../functions/FetchIndex";
import Chip from "../../../components/Chip";

type ProjectCardProps = {
  project: IndexProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const maxChipCount = 3;

  return (
    <Card
      title={project.display_name}
      content={
        <div>
          <div className="mb-1 -mt-3 chip-list-sm">
            {project.techstack.slice(0, maxChipCount).map((techstack, index) => (
              <Chip key={index} text={techstack} className="opacity-90" />
            ))}
            {project.techstack.length > maxChipCount && (
              <Chip
                key={"more"}
                text={`+ ${project.techstack.length - maxChipCount} ${
                  project.techstack.length - maxChipCount === 1 ? "other" : "others"
                }...`}
                className="opacity-60"
              />
            )}
          </div>
          <p>{project.excerpt}</p>
        </div>
      }
      buttons={<Button href={`/#/project/${project.file.replace(".json", "")}`}>View {project.display_name}</Button>}
      isInner={true}
    />
  );
};

export default ProjectCard;
