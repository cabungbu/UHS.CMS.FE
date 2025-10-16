"use client";

import * as React from "react";
import {
  Button,
  ButtonGroup,
} from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/tiptap/components/tiptap-ui-primitive/popover";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/tiptap/components/tiptap-ui-primitive/card";
import { Separator } from "@/tiptap/components/tiptap-ui-primitive/separator";
import { BanIcon } from "@/tiptap/components/tiptap-icons/ban-icon";
import { type Editor } from "@tiptap/react";
import {
  useLineHeight,
  LINE_HEIGHTS,
} from "@/tiptap/components/tiptap-ui/line-height-popover";

export const LineHeightPopover = ({ editor }: { editor?: Editor | null }) => {
  const {
    isVisible,
    currentValue,
    applyLineHeight,
    removeLineHeight,
    canSetLineHeight,
    Icon,
  } = useLineHeight({ editor });
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isVisible) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isOpen ? "on" : "off"}
          aria-label="Line height"
          tooltip="Line height"
          disabled={!canSetLineHeight}
        >
          <Icon className="tiptap-button-icon" />
        </Button>
      </PopoverTrigger>

      <PopoverContent aria-label="Line height options">
        <Card>
          <CardBody>
            <CardItemGroup orientation="horizontal">
              <ButtonGroup orientation="horizontal">
                {LINE_HEIGHTS.map((h) => (
                  <Button
                    key={h.value}
                    type="button"
                    role="menuitem"
                    onClick={() => applyLineHeight(h.value)}
                    data-active-state={currentValue === h.value ? "on" : "off"}
                  >
                    {h.label}
                  </Button>
                ))}
              </ButtonGroup>
              <Separator />
              <ButtonGroup orientation="horizontal">
                <Button
                  onClick={removeLineHeight}
                  type="button"
                  data-style="ghost"
                  tooltip="Reset line height"
                >
                  <BanIcon className="tiptap-button-icon" />
                </Button>
              </ButtonGroup>
            </CardItemGroup>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
