import React, { ReactNode } from "react";

interface BaseComponentProps {
  leftSideContent: ReactNode;
  children: ReactNode;
}

const BaseComponent: React.FC<BaseComponentProps> = ({
  leftSideContent,
  children,
}) => {
  // Use `flex-col` for mobile and `flex-row` for larger screens
  return (
    <div className="flex flex-col sm:flex-row rounded-md p-3 mb-6 hover:bg-white/5">
      <div className="flex-shrink-0 font-semibold text-slate text-xs uppercase mb-4 sm:mb-0 sm:mr-4">
        {leftSideContent}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default BaseComponent;
