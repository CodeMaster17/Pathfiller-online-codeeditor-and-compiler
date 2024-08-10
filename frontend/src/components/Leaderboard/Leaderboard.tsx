import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import GridPattern from "../magicui/grid-pattern";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Harsh",
    description: "Rank 1",
    time: "15m ago",
    icon: "👤",
    color: "#00C9A7",
  },
  {
    name: "Harshit",
    description: "Rank 2",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Nikita",
    description: "Rank 3",
    time: "5m ago",
    icon: "👤",
    color: "#FF3D71",
  },
  {
    name: "Rumaina",
    description: "Rank 4",
    time: "2m ago",
    icon: "👤",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col md:flex-row p-6 overflow-hidden bg-background bg-black md:shadow-xl",
        className,
      )}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center pl-16">
        <h2 className="text-white text-3xl font-bold mb-4">
          On our leaderboard, you'll find the elite coders who consistently rise to the top in every contest.
        </h2>
        <p className="text-gray-300 text-xl pt-4">
          These fast coders are the epitome of precision and speed, turning challenges into opportunities to showcase their expertise. With quick thinking and flawless execution, they set the standard for excellence, proving that mastery isn't just about solving problems—it's about doing so with efficiency and finesse. Every contest is a testament to their dedication, and their presence on the leaderboard is a mark of their relentless pursuit of coding perfection.
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
      />
    </div>
  );
}
