import { svgIcons } from "@/collections/svg";

export function Sidebar({ heading }) {
  return (
    <>
      <aside className="sidebar">
        <h1 className="sidebar-heading font-bold uppercase">{heading}</h1>
        {/* <ul className="sidebar-options-list my-auto column-center-stretch">
                    <li className="sidebar-option-items w-full row-between-center">
                        Status
                        {svgIcons.dropdown}
                    </li>
                    <li className="sidebar-option-items w-full row-between-center">
                        Price
                        {svgIcons.dropdown}
                    </li>
                    <li className="sidebar-option-items w-full row-between-center">
                        Collections
                        {svgIcons.dropdown}
                    </li>
                    <li className="sidebar-option-items w-full row-between-center">
                        Chains
                        {svgIcons.dropdown}
                    </li>
                    <li className="sidebar-option-items w-full row-between-center">
                        Categories
                        {svgIcons.dropdown}
                    </li>
                    <li className="sidebar-option-items w-full row-between-center">
                        Legendry Assets
                        {svgIcons.dropdown}
                    </li>
                </ul> */}
      </aside>
    </>
  );
}
