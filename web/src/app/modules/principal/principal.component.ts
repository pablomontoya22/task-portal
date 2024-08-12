import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from "../../services/data.service";
import { DatePipe } from '@angular/common';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from "../task-form/task-form.component";
import { Task } from "../interfaces";
import { Router } from "@angular/router"

@Component({
    selector: "app-principal",
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        NgOptimizedImage,
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        MatSlideToggleModule
    ],
    templateUrl: "./principal.component.html",
    styleUrl: "./principal.component.scss"
})
export class PrincipalComponent implements OnInit {
    tasks: Task[] = []

    constructor(
        private dataService: DataService,
        private datePipe: DatePipe,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.dataService.getTasks().subscribe(res => {
            this.tasks = res.data.sort((a: Task, b: Task) => b.created.seconds - a.created.seconds);
        });
    }

    delete(id: string) {
        this.dataService.deleteTask(id).subscribe(res => {
            if (res.status === "OK") {
                this.fetchData();
            }
        });
    }

    complete(event: MatSlideToggleChange, id: string) {
        if (event.checked) {
            this.dataService.completeTask(id).subscribe(res => {
                if (res.status === "OK") {
                    this.fetchData();
                }
            });
        } else {
            this.dataService.pendingTask(id).subscribe(res => {
                if (res.status === "OK") {
                    this.fetchData();
                }
            });
        }
    }

    formatDate(dateObj: { seconds: number }) {
        return this.datePipe.transform(dateObj.seconds * 1000, 'dd/MM/yyyy');
    }

    readonly dialog = inject(MatDialog);

    openDialog(task?: Task): void {
        const dialogRef = this.dialog.open(TaskFormComponent, {
            width: '40em',
            height: '67.5vh',
            data: task
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                if (task?.id) {
                    this.dataService.editTask(task?.id, result).subscribe(res => {
                        if (res.status === "OK") {
                            this.fetchData();
                        }
                    });
                } else {
                    result.state = "pending"
                    this.dataService.addTask(result).subscribe(res => {
                        if (res.status === "OK") {
                            this.fetchData();
                        }
                    });
                }
            }
        });
    }

    logout() {
        this.router.navigate(['/login'])
    }
}
