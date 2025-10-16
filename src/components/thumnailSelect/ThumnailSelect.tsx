"use client";

import { Flex, App, Image } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { Upload, Button } from "antd";
import { useState } from "react";
import styles from "./ThumbnailSelect.module.scss";
import type { RadioChangeEvent } from "antd";
import { Input, Radio } from "antd";

export default function ThumbnailSelect() {
  const { message } = App.useApp();
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [value, setValue] = useState("drop");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    fileList: fileList,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được upload file ảnh!");
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-1);
      setFileList(newFileList);

      if (info.file.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(info.file.originFileObj);
      }

      if (status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    onRemove() {
      setFileList([]);
      setPreviewUrl("");
    },
  };

  const handleRemoveImage = () => {
    setFileList([]);
    setPreviewUrl("");
  };

  return (
    <Flex
      vertical={true}
      style={{ padding: "20px" }}
      className="w-full bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg gap-3"
    >
      <p
        className="text-lg font-semibold"
        style={{ color: "var(--primary-blue)" }}
      >
        Thumbnail
      </p>
      <div className={styles.customUpload}>
        <Radio.Group onChange={onChange} value={value}>
          <Flex gap={16} className="w-full">
            {/* Dragger - 50% width */}
            <Flex vertical gap={8} style={{ flex: 1 }}>
              <Radio value="drop">Chọn ảnh từ thư viện</Radio>
              <Dragger {...props} style={{ width: "100%" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag image to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Chỉ hỗ trợ upload 1 ảnh duy nhất (Max 5MB)
                </p>
              </Dragger>
            </Flex>

            {/* Input - 50% width */}
            <Flex vertical gap={8} style={{ flex: 1 }}>
              <Radio value="link-input">Nhập link ảnh</Radio>
              <Input
                placeholder="Nhập link ảnh"
                style={{ width: "100%", height: "auto" }}
                disabled={value !== "link-input"}
              />
            </Flex>
          </Flex>
        </Radio.Group>

        {previewUrl && (
          <div className={styles.imagePreview} style={{ marginTop: "16px" }}>
            <Image
              src={previewUrl}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid var(--gray-8)",
              }}
            />
          </div>
        )}
        {fileList.length > 0 && (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleRemoveImage}
            style={{ marginTop: "8px" }}
          >
            Xóa ảnh
          </Button>
        )}
      </div>
    </Flex>
  );
}
