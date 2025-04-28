import Card from "../../../components/Card";
import { IndexProject } from "../../../functions/FetchIndex";
import Chip from "../../../components/Chip";
import { useIsMediumScreen } from "../../../functions/UseMediaQuery";

type ProjectCardProps = {
  project: IndexProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const maxChipCount = useIsMediumScreen() ? 6 : 4;

  return (
    <Card
      content={
        <div className="space-y-1">
          <h3>
            {!project.private && <i className="fa-brands fa-github text-primary-200 opacity-90"></i>}{" "}
            {project.display_name}
          </h3>

          <p>{project.excerpt}</p>
        </div>
      }
      buttons={
        <div className="flex justify-end chip-list-sm">
          {project.techstack.length <= maxChipCount ? ( // Show x amount of chips, limited by maxChipCount
            project.techstack.map((tech, index) => <Chip key={index} text={tech} className="opacity-90" />)
          ) : (
            <>
              {project.techstack.slice(0, maxChipCount - 1).map((tech, index) => (
                <Chip key={index} text={tech} className="opacity-90" /> // More than x techstacks, => last chip becomes "More" chip
              ))}
              <Chip
                key="more"
                text={`+ ${project.techstack.length - (maxChipCount - 1)} others...`} // case of 1 other won't happen because then we'd just show the techstack
                className="opacity-60"
              />
            </>
          )}
        </div>
      }
      href={`/#/project/${project.file.replace(".json", "")}`}
    />
  );
};

export default ProjectCard;
