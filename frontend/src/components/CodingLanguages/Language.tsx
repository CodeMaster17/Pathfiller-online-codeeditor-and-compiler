import IconCloud from "@/components/magicui/icon-cloud";
import "./Language.css"
 
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];
const Language = () => {
  return (
    <div>
      <h1 className="langTitle"></h1>
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}

export default Language