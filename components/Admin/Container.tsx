import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { adminFaliure, fetchAllAdminData } from "@/redux/slices/adminSlice";
import { clearAllErrors } from "@/redux/slices/errorSlice";
import { LoginResponseData } from "@/types/LoginResponseData";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Users from "./Users";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Roles from "./Roles";
import styles from '@/styles/Admin.module.css'

export default function AdminContainer() {
  const dispatch = useAppDispatch();
  const adminState = useAppSelector(state => state.admin);
  const error = useAppSelector(state => state.error);
  const router = useRouter();
  const [tabName, setTabName] = useState("users");
  useEffect(() => {
    dispatch(clearAllErrors());
    const localStorageData = localStorage.getItem('data');
    const dataJson: LoginResponseData = JSON.parse(localStorageData ? localStorageData : '');
    dispatch(fetchAllAdminData({ token: dataJson.token }));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(error).length && (error.general === 'Session Expired' || error.general === 'User Not Found')) {
      dispatch(adminFaliure());
      toast.error("Session Expired");
      router.push('/login');
    } else if (Object.keys(error).length && (error.general === 'Access Denied')) {
      router.push('/_error');
      return;
    }
  }, [dispatch, router, error])

  return (
    adminState.success && 
    <section>
      <div className="flex gap-4 p-5 items-center">
        <Button onPress={() => setTabName("users")} className={tabName === "users" ? styles['button-color'] : undefined} variant={tabName !== "users" ? "bordered" : undefined}> Users </Button>
        <Button onPress={() => setTabName("roles")} className={tabName === "roles" ? styles['button-color'] : undefined} variant={tabName !== "roles" ? "bordered" : undefined}> Roles </Button>
      </div>
      {tabName == "users" ? <Users /> : <Roles />}
    </section>
  );
}