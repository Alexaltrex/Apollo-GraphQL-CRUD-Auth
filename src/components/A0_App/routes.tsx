import React from "react";
import {HomePage} from "../B0_HomePage/HomePage";
import {CreatePage} from "../B1_CreatePage/CreatePage";
import {ReadPage} from "../B2_ReadPage/ReadPage";
import {UpdatePage} from "../B4_UpdatePage/UpdatePage";
import {DeletePage} from "../B5_DeletePage/DeletePage";
import {PollingPage} from "../B6_PollingPage/PollingPage";
import {RefetchingPage} from "../B7_RefetchingPage/RefetchingPage";
import {LazyPage} from "../B8_LazyPage/LazyPage";
import {Chat} from "../B9_Chat/Chat";

export const routes = [
    {label: "Home", path: "/", element: <HomePage/>, crud: false, auth: false},
    {label: "Create", path: "create", element: <CreatePage/>, crud: true, auth: true},
    {label: "Read", path: "read", element: <ReadPage/>, crud: true, auth: false},
    {label: "Update", path: "update", element: <UpdatePage/>, crud: true, auth: true},
    {label: "Delete", path: "delete", element: <DeletePage/>, crud: true, auth: true},
    {label: "Polling", path: "polling", element: <PollingPage/>, crud: false, auth: false},
    {label: "Refetch", path: "refetch", element: <RefetchingPage/>, crud: false, auth: false},
    {label: "Lazy", path: "lazy", element: <LazyPage/>, crud: false, auth: false},
    {label: "Chat", path: "Chat", element: <Chat/>, crud: false, auth: true},
]

export const linksAuth = routes
    //.filter(route => route.auth)
    .map(({label, path, crud}) => ({label, to: path, crud}))

export const linksNotAuth = routes
    .filter(route => !route.auth)
    .map(({label, path, crud}) => ({label, to: path, crud}))

export const [, ...homeLinksAuth] = linksAuth;
export const [, ...homeLinksNotAuth] = linksNotAuth;
