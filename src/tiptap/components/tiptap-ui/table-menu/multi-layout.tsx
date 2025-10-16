"use client";
import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import "./styles.css";
import {
  Button,
  ButtonGroup,
} from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/tiptap/components/tiptap-ui-primitive/dropdown-menu";
import { Card, CardBody } from "@/tiptap/components/tiptap-ui-primitive/card";

import { TableCell } from "@tiptap/extension-table";
import { Table } from "@tiptap/extension-table";

export const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      isLayout: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-is-layout"),
        renderHTML: (attributes) => {
          if (attributes.isLayout) {
            return {
              "data-is-layout": "true",
            };
          }
          return {};
        },
      },

      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          if (attributes.backgroundColor) {
            return {
              "data-background-color": attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            };
          }
          return {};
        },
      },
    };
  },
});

export const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      isLayout: {
        default: null,
        parseHTML: (element) => element.classList.contains("layout-table"),
        renderHTML: (attributes) => {
          if (attributes.isLayout) {
            return {
              class: "layout-table",
            };
          }
          return {};
        },
      },
    };
  },
});

export const MultiLayoutDropdownMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-variant="ghost" data-size="icon">
          Layout
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <Card>
          <CardBody>
            <ButtonGroup className="gap-1">
              <DropdownMenuItem
                onClick={() => {
                  const { from } = editor.state.selection;

                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
                    .run();

                  setTimeout(() => {
                    const { state, view } = editor;
                    const { tr } = state;

                    let targetTablePos: number | null = null;

                    state.doc.nodesBetween(
                      from - 1,
                      from + 200,
                      (node, pos) => {
                        if (
                          node.type.name === "table" &&
                          targetTablePos === null
                        ) {
                          targetTablePos = pos;

                          tr.setNodeMarkup(pos, null, {
                            ...node.attrs,
                            isLayout: true,
                          });
                          return false;
                        }
                      }
                    );

                    if (targetTablePos !== null) {
                      const tablePos = targetTablePos;
                      view.dispatch(tr);

                      setTimeout(() => {
                        try {
                          const dom = view.nodeDOM(tablePos);
                          if (dom && dom instanceof HTMLElement) {
                            const tableElement =
                              dom.tagName === "TABLE"
                                ? dom
                                : dom.querySelector("table");

                            if (tableElement) {
                              tableElement.classList.add("layout-table");
                            }
                          }
                        } catch (e) {
                          console.error("Error finding table DOM:", e);
                        }
                      }, 50);
                    }
                  }, 50);
                }}
              >
                Insert 2 column layout
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnBefore().run()}
              >
                Add Column Before
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnAfter().run()}
              >
                Add Column After
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteColumn().run()}
              >
                Delete Column
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowBefore().run()}
              >
                Add Row Before
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowAfter().run()}
              >
                Add Row After
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteRow().run()}
              >
                Delete Row
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().mergeOrSplit().run()}
              >
                Merge / Split Cells
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteTable().run()}
              >
                Delete Layout
              </DropdownMenuItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
