import React, { useCallback } from "react";
import { ButtonTab } from "design-system";

import { AppTheme } from "entities/AppTheming";
import { TooltipComponent } from "design-system";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { invertedBoxShadowOptions } from "constants/ThemeConstants";

interface ThemeBoxShadowControlProps {
  options: {
    [key: string]: string;
  };
  selectedOption?: string;
  theme: AppTheme;
  sectionName: string;
  updateTheme: (theme: AppTheme) => void;
}

function ThemeBoxShadowControl(props: ThemeBoxShadowControlProps) {
  const { options, sectionName, selectedOption, theme, updateTheme } = props;

  /**
   * changes the shadow in the theme
   */
  const onChangeShadow = useCallback(
    (optionKey: string) => {
      updateTheme({
        ...theme,
        properties: {
          ...theme.properties,
          boxShadow: {
            ...theme.properties.boxShadow,
            [sectionName]: options[optionKey],
          },
        },
      });
    },
    [updateTheme, theme],
  );

  const selectedOptionKey = selectedOption
    ? [invertedBoxShadowOptions[selectedOption]]
    : [];

  const buttonTabOptions = Object.keys(options).map((optionKey) => ({
    icon: (
      <TooltipComponent
        content={optionKey}
        key={optionKey}
        openOnTargetFocus={false}
      >
        <div
          className="flex items-center justify-center w-5 h-5 bg-white"
          style={{ boxShadow: options[optionKey] }}
        >
          {options[optionKey] === "none" && (
            <CloseLineIcon className="text-gray-700" />
          )}
        </div>
      </TooltipComponent>
    ),
    value: optionKey,
  }));

  return (
    <ButtonTab
      options={buttonTabOptions}
      selectButton={onChangeShadow}
      values={selectedOptionKey}
    />
  );
}

export default ThemeBoxShadowControl;
