import { svgIcons } from "@/collections/svg";

export function NoEvents() {
  return (
    <div className="no-events column-center-center w-full">
      <span className="ghost-icon box">{svgIcons.ghost}</span>
      <p className="message font-light">
        No events have occurred yet! <br />
        Check back later.
      </p>
    </div>
  );
}
