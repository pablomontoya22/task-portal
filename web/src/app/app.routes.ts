import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/principal/principal.component").then((m) => m.PrincipalComponent)
    },
    {
        path: "login",
        loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    }
];
