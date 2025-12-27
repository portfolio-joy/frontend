import { useAppSelector } from "@/hooks/hooks";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@heroui/react";
import styles from '@/styles/Admin.module.css'
import { Key, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";
import { AdminRoleData } from "@/types/AdminRoleData";

export default function Roles() {
    const adminState = useAppSelector(state => state.admin);
    const [roles, setRoles] = useState<AdminRoleData[]>([]);

    useEffect(() => {
        if (adminState.success) {
            setRoles(adminState.data ? adminState.data.roles : []);
        }
    }, [adminState.success, adminState.data]);

    const columns = [
        { name: "Name", uid: "name", align : "start" as "start"},
        { name: "No of Users", uid: "userCount", align : "center" as "center"},
        { name: "Actions", uid: "actions", align : "end" as "end"}
    ];

    const renderCell = (role: AdminRoleData, columnKey: Key) => {

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{role.name}</p>
                    </div>
                );
            case "userCount":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{role.userCount}</p>
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
                        <Tooltip content="Edit Role">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Role">
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
        <Table className="block mx-auto p-5 max-w-5xl" aria-label="Fetching all roles">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn className={styles['table-header']} key={column.uid} align={column.align}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={roles}>
                {(item) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}