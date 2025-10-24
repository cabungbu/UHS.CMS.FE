"use client";

import { Modal, Avatar, Divider, Flex } from "antd";
import { GoPasskeyFill } from "react-icons/go";
import { RoleDropdown } from "./roleDropdown";

export const ModalUserDetail = ({
  user,
  open,
  onClose,
}: {
  user: any;
  open: boolean;
  onClose: () => void;
}) => {
  if (!user) return null;

  return (
    <Modal
      title={
        <p className="text-lg font-semibold text-[var(--primary-green)]">
          CẬP NHẬT THÔNG TIN
        </p>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Divider />
      <div className="flex flex-col gap-3 text-[var(--page-text)]">
        <div className="flex gap-5 items-center">
          <Avatar
            src="https://guchat.vn/wp-content/uploads/2025/04/anh-meo-4.jpeg"
            size={120}
            shape="circle"
            className="rounded-2xl"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-lg text-[var(--gray-7)]">{user.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <Flex>
            <GoPasskeyFill className="text-[var(--primary-blue)]" size={24} />
            <strong>Quyền</strong>
            <RoleDropdown />
          </Flex>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {user.phone}
          </p>
          <p>
            <strong>Phòng ban:</strong> Phòng đào tạo
          </p>
        </div>
      </div>
    </Modal>
  );
};
