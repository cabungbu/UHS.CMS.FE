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
export const TableDropdownMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-variant="ghost" data-size="icon">
          table
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <Card>
          <CardBody>
            <ButtonGroup className="gap-1">
              <DropdownMenuItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                Insert Table
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
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              >
                Toggle Header Row
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeaderColumn().run()
                }
              >
                Toggle Header Column
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleHeaderCell().run()}
              >
                Toggle Header Cell
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().mergeOrSplit().run()}
              >
                Merge / Split Cells
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteTable().run()}
              >
                Delete Table
              </DropdownMenuItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
