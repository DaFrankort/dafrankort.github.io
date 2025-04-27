import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { IndexProject } from "../../../functions/FetchIndex";
import Chip from "../../../components/Chip";
import { useIsMediumScreen } from "../../../functions/UseMediaQuery";

type ProjectCardProps = {
  project: IndexProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const maxChipCount = useIsMediumScreen() ? 5 : 3;

  return (
    <Card
      content={
        <div className="space-y-1">
          <h3>{project.display_name}</h3>
          <div className="chip-list-sm">
            {project.techstack.length <= maxChipCount ? ( // Show max 3 chips
              project.techstack.map((tech, index) => <Chip key={index} text={tech} className="opacity-90" />)
            ) : (
              <>
                {project.techstack.slice(0, maxChipCount - 1).map((tech, index) => (
                  <Chip key={index} text={tech} className="opacity-90" /> // More than 3 techstacks, => 3rd chip becomes "More" chip
                ))}
                <Chip
                  key="more"
                  text={`+ ${project.techstack.length - (maxChipCount - 1)} others...`} // case of 1 other won't happen because then we'd just show the techstack
                  className="opacity-60"
                />
              </>
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
