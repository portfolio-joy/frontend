import { useAppSelector } from "@/hooks/hooks";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@heroui/react";
import Link from "next/link";
import styles from '@/styles/Admin.module.css'
import { Key, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";
import { AdminUserData } from "@/types/AdminUserData";

export default function Users() {
    const adminState = useAppSelector(state => state.admin);
    const [users, setUsers] = useState<AdminUserData[]>([]);

    useEffect(() => {
        if (adminState.success) {
            setUsers(adminState.data ? adminState.data.users : []);
        }
    }, [adminState.success, adminState.data]);

    const columns = [
        { name: "Name", uid: "name", align : "start" as "start"},
        { name: "Username", uid: "username", align : "center" as "center"},
        { name: "Portfolio", uid: "portfolioUrl", align : "center" as "center"},
        { name: "Actions", uid: "actions", align : "end" as "end"}
    ];

    const renderCell = (user: AdminUserData, columnKey: Key) => {

        switch (columnKey) {
            case "name":
                return (
                    <div className="inline-flex flex-col items-start">
                        <span className="text-small text-inherit">{user.firstName + (user.lastName ?" "+user.lastName : '')}</span>
                        <span className="text-tiny text-foreground-400">{user.emailId}</span>
                    </div>
                );
            case "username":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{user.username}</p>
                    </div>
                );
            case "portfolioUrl":
                return (
                    <div className="flex flex-col">
                        <Link className="text-bold text-blue-500 text-sm underline" href={user.username ? process.env.NEXT_PUBLIC_PORTFOLIO_URL + '/' + user.username : ''} target="_blank">{user.username ? process.env.NEXT_PUBLIC_PORTFOLIO_URL + '/' + user.username : ''}</Link>
                    </div>
                );
            case "actions":
                return (
                    <div className="flex gap-2 justify-end">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <Table className="block mx-auto p-5 max-w-5xl" aria-label="Fetching all users">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn className={styles['table-header']} key={column.uid} align={column.align}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.emailId}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}