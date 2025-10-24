"use client";

import { Avatar, Flex } from "antd";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import { ModalUserDetail } from "./modalUserDetail";

export default function UserGridList() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@example.com",
        role: "Admin",
        phone: "0123456789",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "b@example.com",
        role: "Editor",
        phone: "0987654321",
      },
      {
        id: 3,
        name: "Lê Văn C",
        email: "c@example.com",
        role: "User",
        phone: "0999888777",
      },
      {
        id: 4,
        name: "Phạm Thị D",
        email: "d@example.com",
        role: "Approver",
        phone: "0111222333",
      },
      {
        id: 5,
        name: "Đặng Văn E",
        email: "e@example.com",
        role: "Viewer",
        phone: "123456789",
      },
      {
        id: 6,
        name: "Đặng Văn F",
        email: "e@example.com",
        role: "Viewer",
        phone: "123456789",
      },
    ]);
  }, []);

  const handleCardClick = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div>
      <div className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {users.map((user) => (
          <Flex
            key={user.id}
            vertical
            gap={5}
            onClick={() => handleCardClick(user)}
            className="shadow-md rounded-2xl !border-0 !bg-[var(--sidebar-bg)] flex !items-center !text-[var(--page-text)] hover:shadow-lg transition-all duration-200"
            style={{ padding: "20px" }}
          >
            <Avatar
              src="https://guchat.vn/wp-content/uploads/2025/04/anh-meo-4.jpeg"
              size={120}
              shape="square"
              className="rounded-2xl mb-4 object-cover"
            />

            <h3 className="text-lg font-semibold text-[var(--primary-green)]">
              {user.name}
            </h3>
            <p className="text-base">{user.role}</p>

            <div className="flex flex-col gap-2 w-full mt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--gray-8)]">
                  <BsTelephoneFill className="text-[var(--primary-green)] text-base" />
                </div>
                <span className="text-base">{user.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--gray-8)]">
                  <MdMeetingRoom className="text-[var(--primary-green)] text-base" />
                </div>
                <span className="text-base break-all">Phòng đào tạo</span>
              </div>
            </div>
          </Flex>
        ))}
      </div>

      <ModalUserDetail
        user={selectedUser}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
